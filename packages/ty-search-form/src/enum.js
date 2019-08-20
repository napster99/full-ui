export const input = () => {
  return {
    'search-type': 'input',
    'search-value': 'input',
    size: 'small',
    placeholder: '请输入',
    style: {
      width: '10em'
    }
  };
};

export const select = () => {
  return {
    'search-type': 'select',
    'search-value': 'select',
    size: 'small',
    placeholder: '请选择',
    style: {
      width: '10em'
    }
  };
};

export const number = () => {
  return {
    'search-type': 'number',
    'search-value': 'number',
    size: 'small',
    style: {
      width: '10em'
    }
  };
};

export const timePicker = () => {
  return {
    'search-type': 'timePicker',
    'search-value': new Date(),
    size: 'small',
    style: {
      width: '10em'
    }
  };
};

export const datePicker = () => {
  return {
    'search-type': 'datePicker',
    'search-value': new Date(),
    size: 'small',
    style: {
      width: '10em'
    }
  };
};

export const button = () => {
  return {
    'search-type': 'button',
    'search-value': 'button',
    'button-text': '按钮',
    size: 'small',
    type: 'primary'
  };
};
