import TimeSlot from '#models/time_slot'

export class TimeSlotDto {
  toJSON(timeSlot: TimeSlot) {
    return {
      id: timeSlot.id,
      createdAt: timeSlot.createdAt,
      dateAt: timeSlot.dateAt,
      startTime: timeSlot.startTime,
      endTime: timeSlot.endTime,
      user: timeSlot.user
        ? {
            name: timeSlot.user.name,
            firstname: timeSlot.user.firstname,
          }
        : null,
    }
  }
}
