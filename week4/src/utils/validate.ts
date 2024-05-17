export const validatePassword = (password: string) => {
  const regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/;
  return regex.test(password);
};

export const validatePhone = (phone: string) => {
  const regex = /^010-\d{4}-\d{4}$/;
  return regex.test(phone);
};

export const formatPhoneNumber = (phoneNumber: string) => {
  // 숫자 이외의 문자 제거
  const cleaned = ("" + phoneNumber).replace(/\D/g, "");

  // 대한민국의 일반적인 전화번호 길이 및 형식에 기반한 조건문
  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
  } else if (cleaned.length === 10) {
    // 지역번호가 02인 경우와 그 외를 구분
    return cleaned.startsWith("02")
      ? cleaned.replace(/(\d{2})(\d{4})(\d{4})/, "$1-$2-$3")
      : cleaned.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
  } else {
    // 지정된 형식에 맞지 않는 번호는 원본 반환
    return phoneNumber;
  }
};
