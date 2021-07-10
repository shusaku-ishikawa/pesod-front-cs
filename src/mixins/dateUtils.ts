import moment from 'moment'

const getFormattedDate = (str: string, format: string) => {
  
  return moment(str).isValid() ? moment(str).format(format) : '-'  
}
export {
  getFormattedDate,    
}