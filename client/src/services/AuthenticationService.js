import Api from '@/services/Api';

export default {
  login(credentials) {
    return Api().post('login', credentials);
  },
};

// AuthenticationService.register({
//   login: 'asdasd@asd.de',
//   password: '123456'
// })
