export function formatDate (text) {
  let pattern = /(\d+)-(\d+)-(\d+)T(\d+):(\d+):(\d{2})/g
  let matches = pattern.exec(text)
  text = `${matches[1]}年${matches[2]}月${matches[3]}日${matches[4]}点${matches[5]}分`
  return text
}
