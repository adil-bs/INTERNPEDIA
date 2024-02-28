export function formatTime(timestamp:number) {
  const dateObj = new Date(timestamp)
  return dateObj.toLocaleTimeString('en-IN',{hour:'numeric',minute:"2-digit",hour12:true})
}