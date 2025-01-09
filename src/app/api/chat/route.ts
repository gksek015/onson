// import { openai } from '@ai-sdk/openai';
// import { streamText } from 'ai';

// // 헨들러의 최대 실행 시간 30초
// export const maxDuration = 30;

// //NextRquest대신 Request 사용함(쿠키 이런거 없이 메세지만 사용해서)
// export async function POST(req: Request) {
//   const { messages } = await req.json();

//   // 여기에 설정해둔 ai 모델의 답변이 저장됨
//   const result = streamText({
//     model: openai('gpt-4o'),
//     messages,
//   });

//   return result.toDataStreamResponse();
// }

