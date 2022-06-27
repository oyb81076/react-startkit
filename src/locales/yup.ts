/* eslint-disable no-template-curly-in-string */

import type { LocaleObject } from 'yup/lib/locale';

const locale: LocaleObject = {
  string: {
    length: '必须是${length}个字符',
    min: '不能少于${min}个字符',
    max: '不能超过${max}个字符',
    matches: '无法匹配正则表达式"${regex}"',
    email: '不是合法的email',
    url: '不是合法的url',
    trim: '首尾两边不能包含空格',
    lowercase: '必须是小写字母',
    uppercase: '必须是大写字母',
  },
  number: {
    min: '不能低于${min}',
    max: '不能高于${max}',
    lessThan: '必须小于${less}',
    moreThan: '必须大于${more}',
    positive: '必须是整数',
    negative: '必须是负数',
    integer: '必须是整数',
  },
  date: {
    min: '不能早于${min}',
    max: '不能晚与${max}',
  },
  array: {
    min: '数组长度不能少于${min}',
    max: '数组长度不能大雨${max}',
  },
  object: {
    noUnknown: '字段具有未在对象中指定的键',
  },
  mixed: {
    default: '无默认值',
    required: '必填字段',
    oneOf: '必须是下列值之一${values}',
    notOneOf: '不能是下列值之一${values}',
    notType: '类型错误',
  },
};

export default locale;
