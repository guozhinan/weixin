//全局过滤器
//想法类型
export const filterMindType = function(value){
    if(!value) return;
    if(value == '01') return '任务发布';
    if(value == '02') return '项目发布';
    if(value == '03') return '愿景发布';
}

//创建时间
export const filterCreateTime = function(value){
    if(!value) return;
    let time = new Date(value);
    let y = time.getFullYear();    
    let m = time.getMonth() + 1;    
    m = m < 10 ? ('0' + m) : m;    
    let d = time.getDate();    
    d = d < 10 ? ('0' + d) : d;    
    return y+'/'+m+'/'+d;
}

//
export const filterRepay = function(value){
    if(!value) return;
    if(value == '01') return '一次性回报';
    if(value == '02') return '收益比';
    if(value == '03') return '月收入';
}

export const filterMindStatus = function(value){
    if(!value) return;
    if(value == '01') return '发布中';
    if(value == '02') return '领取中';
    if(value == '03') return '已撤销';
    if(value == '04') return '失败';
    if(value == '05') return '成功';
}
