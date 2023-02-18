import { format } from 'util';

export enum SupportedLang {
  Unknown,
  ru,
  en,
  uz,
}

//#region Const
const CNTEMPLATE = '%s %s';
const CNTRIAD_LENGTH = 3;

const CNTRIAD_NAME: string[][] = [
  ['', 'тысяч', 'миллион', 'миллиард', 'триллиион'],
  ['', 'Thousand', 'Million', 'Billion', 'Trillion'],
  ['', 'минг', 'миллион', 'миллиард', 'триллиион'],
];

const CNTRIAD_ENDS: string[][][] = [
  [
    // rus
    ['', '', '', '', '', '', '', '', '', ''],
    ['', 'а', 'и', 'и', 'и', '', '', '', '', ''], // тысячА, тысячИ,
    ['', '', 'а', 'а', 'а', 'ов', 'ов', 'ов', 'ов', 'ов'], // миллионА, миллионОВ
    ['', '', 'а', 'а', 'а', 'ов', 'ов', 'ов', 'ов', 'ов'], // миллионА, миллионОВ
    ['', '', 'а', 'а', 'а', 'ов', 'ов', 'ов', 'ов', 'ов'], // миллиардА, миллиардОВ
  ],
  [
    // eng
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
  ],
  [
    // uzb
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
  ],
];

const CNLOW_NAME: string[][] = [
  [
    '',
    'од',
    'дв',
    'три',
    'четыре',
    'пять',
    'шесть',
    'семь',
    'восемь',
    'девять',
  ],
  ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'],
  ['', 'бир', 'икки', 'уч', 'тўрт', 'беш', 'олти', 'етти', 'саккиз', 'тўққиз'],
];

const CNMIDDLE_NAME: string[][] = [
  [
    '',
    '',
    'двадцать',
    'тридцать',
    'сорок',
    'пятьдесят',
    'шестьдесят',
    'семьдесят',
    'восемьдесят',
    'девяносто',
  ],
  [
    '',
    '',
    'Twenty',
    'Thirty',
    'Fourty',
    'Fifty',
    'Sixty',
    'Seventy',
    'Eighty',
    'Ninety',
  ],
  [
    '',
    '',
    'йигирма',
    'ўттиз',
    'қирқ',
    'эллик',
    'олтмиш',
    'етмиш',
    'саксон',
    'тўқсон',
  ],
];

const CNHI_NAME: string[][] = [
  [
    '',
    'сто',
    'двести',
    'триста',
    'четыреста',
    'пятьсот',
    'шестьсот',
    'семьсот',
    'восемьсот',
    'девятьсот',
  ],
  [
    '',
    'One Hundred',
    'Two Hundreds',
    'Three Hundreds',
    'Four Hundreds',
    'Five Hundreds',
    'Six Hundreds',
    'Seven Hundreds',
    'Eight Hundreds',
    'Nine Hundreds',
  ],
  [
    '',
    'бир юз',
    'икки юз',
    'уч юз',
    'тўрт юз',
    'беш юз',
    'олти юз',
    'етти юз',
    'саккиз юз',
    'тўққиз юз',
  ],
];

const CNFROM1TO19: string[][] = [
  [
    'десять',
    'одиннадцать',
    'двенадцать',
    'тринадцать',
    'четырнадцать',
    'пятнадцать',
    'шестнадцать',
    'семнадцать',
    'восемнадцать',
    'девятнадцать',
  ],
  [
    'Ten',
    'Eleven',
    'Twelve',
    'Thirteen',
    'Fourteen',
    'Fifteen',
    'Sixteen',
    'Seventeen',
    'Eighteen',
    'Nineteen',
  ],
  [
    'ўн',
    'ўн бир',
    'ўн икки',
    'ўн уч',
    'ўн тўрт',
    'ўн беш',
    'ўн олти',
    'ўн етти',
    'ўн саккиз',
    'ўн тўққиз',
  ],
];

const CN_ENDS: string[][][] = [
  [
    // rus
    ['', 'ин', 'а', '', '', '', '', '', '', ''], // одИН, двА
    ['', 'на', 'е', '', '', '', '', '', '', ''], // одНА тысяча, двЕ тысячи,
    ['', 'ин', 'а', '', '', '', '', '', '', ''], //
    ['', 'ин', 'а', '', '', '', '', '', '', ''], //
    ['', 'ин', 'а', '', '', '', '', '', '', ''], //
  ],
  [
    // eng
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
  ],
  [
    // uzb
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
  ],
];

const CNSIGN: string[] = ['минус ', 'minus ', 'минус '];
//#endregion

// Replaced with native Utils.format method
// function format(template: string, ...values: string[]): string {
//     return values.reduce(
//         (prev, value, index) => prev.replace(`{${index}}`, value),
//         template
//     );
// }

const getTriadEnds = (
  _LangID: SupportedLang,
  _Index: number,
  value: number
): string =>
  CNTRIAD_ENDS[_LangID - 1][_Index][value > 10 && value < 20 ? 0 : value % 10];

const getEnds = (
  _LangID: SupportedLang,
  _Index: number,
  value: number
): string =>
  value > 10 && value < 20 ? '' : CN_ENDS[_LangID - 1][_Index][value % 10];

const getTriadName = (_LangID: SupportedLang, _str: string): string => {
  let res = '';
  // добиваем нулями слева, чтобы анализировать разряды
  let s = _str.padStart(CNTRIAD_LENGTH, '0');
  const lHi = Number.parseInt(s[0], 10);
  const lMiddle = Number.parseInt(s[1], 10);
  const lLow = Number.parseInt(s[2], 10);

  if (lHi > 0) {
    res = CNHI_NAME[_LangID - 1][lHi];
  }

  switch (lMiddle) {
    case 0:
      s = '';
      break;
    // исключение для многих языков: одиннадцать, двенадцать и т.д.
    case 1:
      s = CNFROM1TO19[_LangID - 1][lLow];
      break;
    default:
      s = CNMIDDLE_NAME[_LangID - 1][lMiddle];
  }
  if (s !== '') {
    res = format(CNTEMPLATE, res, s).trim();
  }

  s = lMiddle !== 1 ? CNLOW_NAME[_LangID - 1][lLow] : '';
  if (s !== '') {
    res = format(CNTEMPLATE, res, s).trim();
  }
  return res;
};

const splitOnTriads = (value: string): string[] => {
  const res: string[] = [];
  while (value !== '') {
    res.unshift(value.slice(-CNTRIAD_LENGTH));
    value = value.substring(0, value.length - res[0].length);
  }
  return res;
};

const getString = (_Lang: SupportedLang, _Value: number): string => {
  /*
    Принцип работы:
    "грызем" строку на триады справа налево, конвертируем триаду, собираем результат
    */
  const triads = splitOnTriads(Math.abs(_Value).toString());
  const maxIndex = triads.length - 1;
  return _Value < 0
    ? CNSIGN[_Lang - 1]
    : '' +
        triads
          .reduce((prev, triad, index) => {
            const triadAsNumber = parseInt(triad, 10);
            return (
              prev +
              ' ' +
              format(
                CNTEMPLATE,
                getTriadName(_Lang, triad) +
                  getEnds(_Lang, maxIndex - index, triadAsNumber),
                triadAsNumber !== 0
                  ? CNTRIAD_NAME[_Lang - 1][maxIndex - index] +
                      getTriadEnds(_Lang, maxIndex - index, triadAsNumber)
                  : ''
              )
            );
          }, '')
          .trim();
};

/**
 * Convert Numbers Into Words
 */
export const numberToWord = (
  value: number | string,
  decimals: number = 0,
  langID: SupportedLang = SupportedLang.uz,
  suffixes: string[] = []
): string => {
  // const
  //     CNTEMPLATE_SUFFIX = ' %s';
  const valueFixed = parseFloat((+value).toFixed(decimals));
  const lMainPart = Math.trunc(valueFixed);
  const [mainSufix = '', fractSufix = ''] = suffixes;
  // дробная часть не транслируется, учитываются только 2 разряда, т.к. используется в основном только для цен\сумм
  const lRestPart = Math.round(
    Math.pow(10, decimals) * (valueFixed - lMainPart)
  );
  // const s = returnAsTemplate ? CNTEMPLATE_SUFFIX : '';

  return format(
    CNTEMPLATE,
    getString(langID, lMainPart) + ` ${mainSufix}`,
    lRestPart !== 0 && decimals > 0
      ? numberToWord(lRestPart.toString().padStart(2, '0'), 0, langID) +
          ` ${fractSufix}`
      : ''
  )
    .trim()
    .replace('  ', '');
};
