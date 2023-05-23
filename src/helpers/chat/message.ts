import moment from "moment"

export const sayHello = (name: string) => {
  return `Tôi là ${name}. Bây giờ dựa theo giờ hiện tại của tôi: ${moment().format("HH:mm")}, bạn hãy chào tôi theo buổi và trả lời "Tôi là trợ lý học tiếng Anh của bạn. Bạn cần tôi giúp gì không?"`
}

export const templateMessage = (content: string) => {
  return `Bạn hãy ghi nhớ điều này trong những câu hỏi tiếp theo nếu tôi hỏi không liên quan về kiến thức chủ đề tiếng Anh bạn hãy từ chối bằng cách trả lời: "Vui lòng hỏi về chủ đề tiếng Anh!", chú ý không nhắc đến hoặc tranh luận thêm bất cứ điều gì về vấn đề này trong câu trả lời của bạn.
  Và xin chú ý cân nhắc kỹ những tin nhắn trước tránh trường hợp đưa ra câu trả lời sai lệch hoặc không thông minh.
  ${content}`
}
