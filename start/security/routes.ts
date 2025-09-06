import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const LogoutController = () => import('#controllers/security/logout_controller')
//const CreateAccountController = () => import('#controllers/security/create_account_controller')
//const ListAccountController = () => import('#controllers/security/list_account_controller')
const AuthenticationController = () => import('#controllers/security/authentication_controller')
const ProfileController = () => import('#controllers/security/profile_controller')

export const SecurityRoutes = () => {
  router
    .group(() => {
      //router.post('/create_accsecretounts', [CreateAccountController, 'createAccount'])
      //router.get('/liste_accounts', [ListAccountController, 'listeBySuperAdmin'])
      //router.get('/liste_admin_accounts', [ListAccountController, 'listeByAdmin'])
      router.put('/update_avatars', [ProfileController, 'updateAvatar'])
      router.post('/remove_avatars', [ProfileController, 'removeAvatar'])
      router.put('/update_profiles', [ProfileController, 'updateProfile'])
    })
    .prefix('/api/security')
    .middleware(middleware.auth())

  router.post('/api/auth', [AuthenticationController, 'authentication'])
  router.get('/api/me', [AuthenticationController, 'currentUser']).middleware(middleware.auth())
  router.post('/api/logout', [LogoutController, 'logout']).middleware(middleware.auth())
}
