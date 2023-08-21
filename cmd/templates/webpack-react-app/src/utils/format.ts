// 示例：date格式化
export function dateToString(time: Date, fmt?: string): string {
  fmt = fmt || 'YYYY-MM-DD hh:mm:ss'
  let ret: any;
  let date = time ? new Date(time) : new Date()
  const opt = {
	"Y+": date.getFullYear().toString(),        // 年
	"M+": (date.getMonth() + 1).toString(),     // 月
	"D+": date.getDate().toString(),            // 日
	"h+": date.getHours().toString(),           // 时
	"m+": date.getMinutes().toString(),         // 分
	"s+": date.getSeconds().toString()          // 秒
  };
  for (let k in opt) {
	ret = new RegExp("(" + k + ")").exec(fmt);
	if (ret) {
	  fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
	};
  };
  return fmt;
}

// string转date
export function stringToDate(dateString: string): Date { 
  if (dateString) { 
		let temp = dateString.split(' '); 
		let [ year, month, day ] = temp[0].split('-');
		let [ hour, minute, second] = temp[1].split(':');
		var date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hour), parseInt(minute), parseInt(second)); 
		return date;
  } 
}