import React, { useState, useEffect } from 'react';
import style from './style.module.less';

interface Props {
  // onChange函数，将参数传出
  onChange: (value: string, valid: boolean) => void,
  // 校验规则
  rules?: Rule[],
  name: string,
  // label
  label: string,
  tip?: string, 
  type: 'text' | 'textarea',
  initialValue?: string,
}

interface Rule {
  required?: boolean,
  test?: RegExp,
  min?: number,
  max?: number,
  message: string,
}

// input组件，自带校验功能，可返回自身状态。
export default function Input(props: Props) {
  const [val, setVal] = useState('');
  const [err, setErr] = useState({flag: false, msg: ''});
  const [flag, setFlag] = useState(false); // 标志位，用于初始化第一次错误信息
  useEffect(() => {
    setVal(props.initialValue || '');
  }, []);

  useEffect(() => {
    // 执行一次
    if(flag) {
      props.onChange(val, check(val));
    } else {
      setFlag(true);
    }
  }, [val]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let value = e.target.value;
    setVal(value);
  }

  const check = (value: string) => {
    if(props.rules) {
      for(let i = 0; i < props.rules?.length; i++) {
        const rule = props.rules[i];
        const message = rule.message;
        if(rule.required && value.length === 0) { // 处理required
          // 增加错误dom
          setErr({flag: true, msg: message});
          return false;
        } 
        if(rule.test) { // 处理test
          const reg = rule.test;
          if(!reg || !reg.test(value)) { // 不满足格式条件
            // 增加错误提示dom
            setErr({flag: true, msg: message});
            return false;
          }
        }
        if(rule.min) {
          const min = rule.min;
          if(value.length < min) 
          {
            setErr({flag: true, msg: message});
            return false;
          }
        }
        if(rule.max) {
          const max = rule.max;
          if(value.length > max) {
            setErr({flag: true, msg: message});
            return false;
          }
        }
      }
    }
    setErr({flag: false, msg: ''});
    return true;
  }

  return (
    <div className={style.formItem}>
      <label htmlFor="input">{props.label}</label>
      {
        err.flag ? <div className={style.err}>{err.msg}</div> : ''
      }
      {
        props.type === 'text' ? 
          <input className='form-item' type="text" name={props.name} value={val} onChange={handleChange} /> :
          <textarea className='form-item' name={props.name} value={val} cols={50} rows={3} onChange={handleChange} ></textarea>
      }
      {
        props.tip && props.tip.length > 0 ? <span className={style.tip}>{props.tip}</span> : ''
      }
    </div>
  )
}