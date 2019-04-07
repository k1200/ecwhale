const SELECT = (params) => {
    let str = `SELECT ${ params.join(',') }`;
    return str;
};
const UPDATE= (table, ...params) => {
    let str =  `UPDATE ${table} SET `
};
const INSERT = () => {

};
const DELETE = () => {

};

/**
 * 方法说明：查询条件
 * @method WHERE
 * @for 所属类名
 * @param { Array } 数组元素也为一个数组，长度为2(条件相等)或3（第二个元素为判断条件）<br/>
 * 例：
 * [
 *  [a, b], [c, <=, d]
 * ]
 * @return {返回值类型} 返回值说明
 */
const WHERE = params => {
    let str = ``
};
const JOIN = () => {

};
const JOINLEFT = () => {

};
const WHEREIN = () => {

};
const LIKE = () => {

};
const FIRST = () => {

};
