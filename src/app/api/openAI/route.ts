import type { PostType } from "@/types/PostType";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { userMessage, filters, filteredPosts } = await req.json();
    let aiResponse = "";
    let recommendedPosts = [];
 
    if (filters) {
      const formattedPosts = filteredPosts.map((filteredPost: PostType) => ({
        id: filteredPost.id,
        title: filteredPost.title,
        date: filteredPost.date,
        end_date: filteredPost.end_date,
        location: `${filteredPost.si} ${filteredPost.gu} ${filteredPost.dong}`,
        category: filteredPost.category,
      }));

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content: `너는 온손 웹사이트의 AI 어시스턴트야. 사용자가 원하는 조건을 가장 많이 포함하고 있는 봉사 게시글을 우선순위로 하여 최대 3개의 게시글을 추천해야 해.
            반드시 JSON 형식으로 반환해야 하며,각 추천된 봉사 게시글은 아래와 같은 구조를 따라야 해:

          JSON 객체 형식:
          [
            recommendations: {
              "id": "게시글 ID",
              "title": "게시글 제목",
              "date": "시작 날짜 (YYYY-MM-DD)",
              "end_date": "종료 날짜 (YYYY-MM-DD)",
              "location": "봉사 위치",
              "category": "카테고리"
            }
          ]`
          },
          {
            role: "user",            
            content: JSON.stringify({
              userMessage,
              filters, 
              formattedPosts, 
            }),
          }
        ],
      });

      const aiResponseJSON = completion.choices[0]?.message?.content;
      console.log(aiResponseJSON);

      try {
        recommendedPosts = aiResponseJSON ? JSON.parse(aiResponseJSON).recommendations : [];
        console.log(recommendedPosts);
        
      } catch (error) {
        console.error("AI 응답 JSON 파싱 오류:", error);
      }

      aiResponse = (recommendedPosts.length > 0)
        ? "아래 추천된 봉사 활동 리스트를 확인하세요!"
        : "입력하신 조건에 맞는 봉사 게시글이 현재 없습니다. 더욱 다양한 봉사 게시글을 확인하고 싶으시면, 봉사 게시판을 이용해주세요!";
      
    } else {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "너는 온손 웹사이트의 AI 어시스턴트야. 질문에 적합한 간결한 답변을 해줘. 너의 이름은 '온손이'이야. 온손(ON:SON)은 새해를 맞아 도움이 필요한 분들에게 먼저 손을 내미는 따뜻한 마음에서 시작되었어. 온손은 'On(켜다)'이라는 의미를 담아, 나눔의 불씨를 밝히고 누구나 쉽게 봉사에 참여할 수 있는 길을 여는데에 그 목적을 두고 있어. 이 서비스를 통해 가까운 거리에 도움이 필요한 분들을 손쉽게 찾고, 봉사활동에 참여하며 따뜻한 세상을 함께 만들어갈 수 있어. 봉사 요청에 관련된 질문을 받는다면, 봉사요청에 대한 설명을 해줘. 봉사요청은 로그인한 유저만 하단에 봉사요청을 터치하여 접근할 수 있어. 봉사 제목, 봉사 위치, 봉사 종류와 기간을 선택해야만 해. 그리고 어떤 봉사를 요청하고 싶은지 구체적인 설명을 적어주어야해. 봉사 사진을 올려주어 어떤 봉사인지 그 모습도 보여주는게 좋아. 만약, 봉사를 검색하는 것과 관련된 질문을 받으면, 다음 내용을 참고해. 관심있는 봉사를 찾아보고 싶다면 상단에 검색 기능을 이용해서 지역별로 그리고 봉사 종류별로 선호하는 봉사를 찾을 수 있어. 이때 봉사를 하고자하는 지역을 검색할 때 '서울 마포구 동교동'처럼 동까지 같이 검색해줘야해. 만약에 실시간 채팅에서 메세지 삭제는 어떻게 하는지 물어보면, 채팅 리스트 부분에서 좌측으로 해당 채팅을 슬라이드하면 메세지 삭제 버튼이 생긴다고 알려줘. 만약 사용자 채팅을 어떻게 해야하는지 물어본다면 상세정보 페이지에서 사용자와 채팅하기 버튼을 눌러서 사용자와 채팅을 할 수 있다고 알려줘" },
          { role: "user", content: userMessage },
        ],
      });

      aiResponse = completion.choices[0]?.message?.content || "죄송합니다, 답변을 생성할 수 없습니다.";
    }

    return NextResponse.json({ message: aiResponse, recommendedPosts});

  } catch (error) {
    console.error("OpenAI API 에러:", error);
    return NextResponse.json({ error: "OPEN API 패치 실패함" }, { status: 500 });
  }
}
