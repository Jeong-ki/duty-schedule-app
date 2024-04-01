const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

/**
 * 대응 국가 목록
    한국 (KR)
    일본 (JP)
    중국 (CN)
    스페인 (ES)
    멕시코 (MX)
    아르헨티나 (AR)
    프랑스 (FR)
    독일 (DE)
    포르투갈 (PT)
    브라질 (BR)
    러시아 (RU)
    사우디아라비아 (SA)
    아랍에미리트 (AE)
    이집트 (EG)
    그 외 (EN)
 */
const calendarData = {
  KR: {
    months: [
      '1월',
      '2월',
      '3월',
      '4월',
      '5월',
      '6월',
      '7월',
      '8월',
      '9월',
      '10월',
      '11월',
      '12월',
    ],
    weekDays: ['일', '월', '화', '수', '목', '금', '토'],
  },
  EN: {
    months: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    weekDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  },
  JP: {
    months: [
      '1月',
      '2月',
      '3月',
      '4月',
      '5月',
      '6月',
      '7月',
      '8月',
      '9月',
      '10月',
      '11月',
      '12月',
    ],
    weekDays: ['日', '月', '火', '水', '木', '金', '土'],
  },
  CN: {
    months: [
      '一月',
      '二月',
      '三月',
      '四月',
      '五月',
      '六月',
      '七月',
      '八月',
      '九月',
      '十月',
      '十一月',
      '十二月',
    ],
    weekDays: ['日', '一', '二', '三', '四', '五', '六'],
  },
  ES: {
    months: [
      'Ene',
      'Feb',
      'Mar',
      'Abr',
      'May',
      'Jun',
      'Jul',
      'Ago',
      'Sep',
      'Oct',
      'Nov',
      'Dic',
    ],
    weekDays: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
  },
  FR: {
    months: [
      'Jan',
      'Fév',
      'Mar',
      'Avr',
      'Mai',
      'Juin',
      'Juil',
      'Août',
      'Sep',
      'Oct',
      'Nov',
      'Déc',
    ],
    weekDays: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
  },
  DE: {
    months: [
      'Jan',
      'Feb',
      'Mär',
      'Apr',
      'Mai',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Okt',
      'Nov',
      'Dez',
    ],
    weekDays: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
  },
  PT: {
    months: [
      'Jan',
      'Fev',
      'Mar',
      'Abr',
      'Mai',
      'Jun',
      'Jul',
      'Ago',
      'Set',
      'Out',
      'Nov',
      'Dez',
    ],
    weekDays: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
  },
  RU: {
    months: [
      'Янв',
      'Фев',
      'Мар',
      'Апр',
      'Май',
      'Июн',
      'Июл',
      'Авг',
      'Сен',
      'Окт',
      'Ноя',
      'Дек',
    ],
    weekDays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
  },
  AR: {
    months: [
      'يناير',
      'فبراير',
      'مارس',
      'أبريل',
      'مايو',
      'يونيو',
      'يوليو',
      'أغسطس',
      'سبتمبر',
      'أكتوبر',
      'نوفمبر',
      'ديسمبر',
    ],
    weekDays: [
      'الأحد',
      'الاثنين',
      'الثلاثاء',
      'الأربعاء',
      'الخميس',
      'الجمعة',
      'السبت',
    ],
  },
};

const countryCalendarMap: {
  [key: string]: (typeof calendarData)[keyof typeof calendarData];
} = {
  EN: calendarData.EN,
  KR: calendarData.KR,
  JP: calendarData.JP,
  CN: calendarData.CN,
  ES: calendarData.ES,
  MX: calendarData.ES,
  AR: calendarData.ES,
  FR: calendarData.FR,
  DE: calendarData.DE,
  PT: calendarData.PT,
  BR: calendarData.PT,
  RU: calendarData.RU,
  SA: calendarData.AR,
  AE: calendarData.AR,
  EG: calendarData.AR,
};

export {DAYS_IN_MONTH, countryCalendarMap};
