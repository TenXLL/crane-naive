export interface ValidationStrategy {
  validator: (value: string) => boolean | Error;
  trigger: string[];
}

const mobileValidationStrategy: ValidationStrategy = {
  validator: (value: string) => {
    const regExp = /^1[3456789]\d{9}$/;
    if (!value) {
      return new Error('手机号不能为空');
    }
    if (!regExp.test(value)) {
      return new Error('请输入正确的手机号');
    }
    return true;
  },
  trigger: ['input', 'blur']
};

const emailValidationStrategy: ValidationStrategy = {
  validator: (value: string) => {
    const regExp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!value) {
      return new Error('邮箱不能为空');
    }
    if (!regExp.test(value)) {
      return new Error('请输入正确的邮箱');
    }
    return true;
  },
  trigger: ['input', 'blur']
};

export { mobileValidationStrategy, emailValidationStrategy };
