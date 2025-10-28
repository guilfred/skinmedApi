import { formatTimeSlot } from '#features/utils'
import TimeSlot from '#models/time_slot'
import {
  CheckAvailableDateValidator,
  CreateBookingValidator,
  DetachBookingValidator,
  DetachFromDropBookingValidator,
  UnlikeBookingValidator,
} from '#validators/booking_validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import { TimeSlotDto } from '../dtos/time_slot_dto.js'

@inject()
export default class BookingController {
  constructor(protected presenter: TimeSlotDto) {}

  async getAvailableBooking({ auth, response, request }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.status(401).send('Requires authentication')
    }
    const { at, agentId } = await request.validateUsing(CheckAvailableDateValidator)

    const booked = agentId
      ? await TimeSlot.query().where('date_at', at).andWhere('user_id', agentId)
      : await TimeSlot.query().where('date_at', at)

    const bookedSlots = booked.map((r: TimeSlot) => {
      const startTime = formatTimeSlot(r.startTime)
      const endTime = formatTimeSlot(r.endTime)

      return {
        at: DateTime.fromJSDate(at).toFormat('yyyy-MM-dd'),
        start: startTime,
        end: endTime,
      }
    })

    return bookedSlots
  }

  async store({ auth, response, request }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.status(401).send('Requires authentication')
    }
    const { start_time, end_time, at, agentId } =
      await request.validateUsing(CreateBookingValidator)

    const timeSlot = new TimeSlot()
    timeSlot.endTime = end_time
    timeSlot.startTime = start_time
    timeSlot.dateAt = DateTime.fromJSDate(at)
    timeSlot.userId = agentId || user.id
    await timeSlot.save()
    await timeSlot.load('user')

    return response.status(201).json(this.presenter.toJSON(timeSlot))
  }

  async detach({ auth, response, request }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.status(401).send('Requires authentication')
    }
    const { at, start, end, new_start, new_end, agentId } =
      await request.validateUsing(DetachBookingValidator)

    const booking = await TimeSlot.query()
      .where('dateAt', at)
      .andWhere('start_time', start)
      .andWhere('end_time', end)
      .andWhere('user_id', agentId || user.id)
      .firstOrFail()

    await booking.delete()

    // recréer un nouveau time slot
    const timeSlot = new TimeSlot()
    timeSlot.endTime = new_end
    timeSlot.startTime = new_start
    timeSlot.dateAt = DateTime.fromJSDate(at)
    timeSlot.userId = agentId || user.id
    await timeSlot.save()

    return response.status(200).send(`Mise à jour de crénau horaire pour le ${at} !`)
  }

  async detachFromDrop({ auth, response, request }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.status(401).send('Requires authentication')
    }
    const { oldAt, newAt, start, end, new_start, new_end, agentId } = await request.validateUsing(
      DetachFromDropBookingValidator
    )

    const booking = await TimeSlot.query()
      .where('dateAt', oldAt)
      .andWhere('start_time', start)
      .andWhere('end_time', end)
      .andWhere('user_id', agentId || user.id)
      .firstOrFail()

    await booking.delete()

    // recréer un nouveau time slot
    const timeSlot = new TimeSlot()
    timeSlot.endTime = new_end
    timeSlot.startTime = new_start
    timeSlot.dateAt = DateTime.fromJSDate(newAt)
    timeSlot.userId = agentId || user.id
    await timeSlot.save()

    return response.status(200).send('Ce créneau est libre !')
  }

  async unlike({ auth, response, request }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.status(401).send('Requires authentication')
    }
    const { at, start, end, agentId } = await request.validateUsing(UnlikeBookingValidator)

    const booking = await TimeSlot.query()
      .where('dateAt', at)
      .andWhere('start_time', start)
      .andWhere('end_time', end)
      .andWhere('user_id', agentId || user.id)
      .firstOrFail()

    await booking.delete()

    return response.status(200).json({ message: 'Ce créneau est libre !' })
  }
}
