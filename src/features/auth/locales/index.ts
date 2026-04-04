export const AUTH_LOGIN_TEXT = {
  TITLE: 'Вход в систему',
  DESCRIPTION: 'Введите свои данные для входа',
  EMAIL_LABEL: 'Email',
  EMAIL_PLACEHOLDER: 'your.email@example.com',
  PASSWORD_LABEL: 'Пароль',
  PASSWORD_PLACEHOLDER: '••••••••',
  SUBMIT_BUTTON: 'Войти',
  NO_ACCOUNT: 'Нет аккаунта?',
  REGISTER_LINK: 'Зарегистрироваться',
  BUTTON_PENDING: 'Вход в систему...',
  LOGIN_SUCCESS: 'Вы успешно вошли в аккаунт!',
  FORGOT_LINK: 'Забыли пароль?',
};

export const AUTH_LOGIN_PAGE_TEXT = {
  SUBTITLE: 'Подготовка к техническим интервью RS School',
  FOOTER: 'Тренируйте навыки технического интервью для этапов отбора в RS School',
};

export const AUTH_LOGIN_ERRORS = {
  INVALID_EMAIL: 'Введите корректный email (пример: your.email@example.com)',
  PASSWORD_MIN: 'Введите пароль',
  PASSWORD_INVALID: 'Используйте только латинские буквы (A–Z, a–z) и цифры (0–9)',
  AUTH_ERROR: 'Ошибка авторизации. Попробуйте позже.',
  OAUTH_ERROR: 'Ошибка авторизации. Попробуйте другой способ входа или повторите попытку позже.',
};

export const AUTH_REGISTER_TEXT = {
  TITLE: 'Создание аккаунта',
  DESCRIPTION: 'Заполните данные для регистрации',
  NAME_LABEL: 'Имя',
  NAME_PLACEHOLDER: 'Ваше имя',
  EMAIL_LABEL: 'Email',
  EMAIL_PLACEHOLDER: 'your.email@example.com',
  PASSWORD_LABEL: 'Пароль',
  PASSWORD_PLACEHOLDER: '••••••••',
  CONFIRM_LABEL: 'Подтвердите пароль',
  SUBMIT_BUTTON: 'Зарегистрироваться',
  HAS_ACCOUNT: 'Уже есть аккаунт?',
  LOGIN_LINK: 'Войти',
  BUTTON_PENDING: 'Регистрация...',
  REGISTER_SUCCESS: 'Вы успешно зарегистрировались!',
};

export const AUTH_REGISTER_PAGE_TEXT = {
  TITLE: 'Регистрация',
  SUBTITLE: 'Создайте аккаунт для начала тренировок',
};

export const AUTH_REGISTER_ERRORS = {
  REQUIRED: 'Поле обязательно для заполнения',
  EMAIL: 'Пожалуйста, укажите действительный адрес электронной почты.',
  NAME: 'Имя должно начинаться с заглавной буквы, не содержать цифр и быть не длиннее 30 символов.',
  PASSWORD:
    'Ваш пароль должен содержать не менее 8 символов, минимум одну заглавную букву (A-Z), одну строчную (a-z) и одну цифру. Без пробелов.',
  PASSWORD_MATCH: 'Пароли не совпадают',
  AUTH_ERROR: 'Ошибка регистрации. Попробуйте позже.',
};

export const FORGOT_PASSWORD_PAGE_TEXT = {
  TITLE: 'Восстановление доступа',
  SUBTITLE: 'Мы поможем вам вернуться к тренировкам',
};

export const FORGOT_PASSWORD_FORM_TEXT = {
  TITLE: 'Забыли пароль?',
  DESCRIPTION: 'Введите email, указанный при регистрации',
  EMAIL_LABEL: 'Email',
  EMAIL_PLACEHOLDER: 'your.email@example.com',
  SUBMIT_BUTTON: 'Сбросить пароль',
  BUTTON_PENDING: 'Сброс пароля...',
  LOGIN_LINK: 'Вспомнили пароль?',
  SUBMIT_SUCCESS: 'Письмо для восстановления пароля отправлено!',
};

export const FORGOT_PASSWORD_ERRORS = {
  AUTH_ERROR: 'Ошибка авторизации. Попробуйте позже.',
};

export const RESET_PASSWORD_PAGE_TEXT = {
  TITLE: 'Новый пароль',
  SUBTITLE: 'Безопасность вашего аккаунта — наш приоритет',
};

export const RESET_PASSWORD_FORM_TEXT = {
  TITLE: 'Установка пароля',
  DESCRIPTION: 'Придумайте надежный пароль, который не использовался вами ранее.',
  PASSWORD_LABEL: 'Новый пароль',
  PASSWORD_PLACEHOLDER: '••••••••',
  CONFIRM_LABEL: 'Подтвердите пароль',
  SUBMIT_BUTTON: 'Войти с новым паролем',
  BUTTON_PENDING: 'Вход в систему...',
  RESET_SUCCESS: 'Вы успешно обновили пароль!',
};

export const RESET_PASSWORD_ERRORS = {
  REQUIRED: 'Поле обязательно для заполнения',
  PASSWORD:
    'Ваш пароль должен содержать не менее 8 символов, минимум одну заглавную букву (A-Z), одну строчную (a-z) и одну цифру. Без пробелов.',
  PASSWORD_MATCH: 'Пароли не совпадают',
  AUTH_ERROR: 'Ошибка сброса пароля',
};
