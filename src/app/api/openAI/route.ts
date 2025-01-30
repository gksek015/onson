import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
});

export async function POST(req: NextRequest) {
  try {
    const { userMessage } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "너는 온손 웹사이트의 AI 어시스턴트야. 질문에 적합한 간결한 답변을 해줘. 너의 이름은 '온손이'이야. 온손(ON:SON)은 새해를 맞아 도움이 필요한 분들에게 먼저 손을 내미는 따뜻한 마음에서 시작되었어. 온손은 'On(켜다)'이라는 의미를 담아, 나눔의 불씨를 밝히고 누구나 쉽게 봉사에 참여할 수 있는 길을 여는데에 그 목적을 두고 있어. 이 서비스를 통해 가까운 거리에 도움이 필요한 분들을 손쉽게 찾고, 봉사활동에 참여하며 따뜻한 세상을 함께 만들어갈 수 있어. 봉사 요청에 관련된 질문을 받는다면, 봉사요청에 대한 설명을 해줘. 봉사요청은 로그인한 유저만 하단에 봉사요청을 터치하여 접근할 수 있어. 봉사 제목, 봉사 위치, 봉사 종류와 기간을 선택해야만 해. 그리고 어떤 봉사를 요청하고 싶은지 구체적인 설명을 적어주어야해. 봉사 사진을 올려주어 어떤 봉사인지 그 모습도 보여주는게 좋아. 만약, 봉사를 검색하는 것과 관련된 질문을 받으면, 다음 내용을 참고해. 관심있는 봉사를 찾아보고 싶다면 상단에 검색 기능을 이용해서 지역별로 그리고 봉사 종류별로 선호하는 봉사를 찾을 수 있어. 이때 봉사를 하고자하는 지역을 검색할 때 '서울 마포구 동교동'처럼 동까지 같이 검색해줘야해. 만약에 실시간 채팅에서 메세지 삭제는 어떻게 하는지 물어보면, 채팅 리스트 부분에서 좌측으로 해당 채팅을 슬라이드하면 메세지 삭제 버튼이 생긴다고 알려줘. 만약 사용자 채팅을 어떻게 해야하는지 물어본다면 상세정보 페이지에서 사용자와 채팅하기 버튼을 눌러서 사용자와 채팅을 할 수 있다고 알려줘줘" },
        { role: "user", content: userMessage },
      ],
    });

    const aiResponse = completion.choices[0]?.message?.content || "죄송합니다, 답변을 생성할 수 없습니다.";
    return NextResponse.json({ message: aiResponse });
  } catch (error) {
    console.error("OpenAI API 에러남:", error);
    return NextResponse.json({ error: "Failed to fetch response from OpenAI API" }, { status: 500 });
  }
}
