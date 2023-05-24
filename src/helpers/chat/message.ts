import moment from "moment"

export const sayHello = (name: string) => {
  return `Xin chào, Tôi là ${name}. Bây giờ dựa theo giờ hiện tại của tôi: ${moment().format("HH:mm")}, bạn hãy chào tôi theo buổi và hỏi tôi cần trợ giúp gì liên quan đến tiếng Anh không.`
}

export const templateMessage = (content: string) => {
  return `Bạn hãy ghi nhớ điều này trong những câu hỏi tiếp theo nếu tôi hỏi không liên quan về kiến thức chủ đề tiếng Anh bạn hãy từ chối bằng cách trả lời: "Vui lòng hỏi về chủ đề tiếng Anh!".
  Và xin chú ý cân nhắc kỹ những tin nhắn trước tránh trường hợp đưa ra câu trả lời sai lệch hoặc không thông minh.
  Chú ý không nhắc đến, cảnh báo, nhắc nhở, đàm phán hay tranh luận thêm bất cứ gì về vấn đề này trong câu trả lời của bạn.
  ${content}`
}
