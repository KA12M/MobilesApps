import React from "react";

function Assessmentform() {
  return (
    <div style={{ backgroundColor: "#fff" }}>
      <div>
        <div
          style={{
            padding: 30,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <p style={{ fontSize: 18, fontWeight: 500, paddingTop: 50 }}>
            แบบสอบถามการได้ยินห้านาทีฉบับภาษาไทย
          </p>
          <p style={{ fontSize: 18, fontWeight: 300 }}>
            (Thai-Version Five Minute Hearing Test: FMHT)
          </p>
          <p style={{ fontSize: 17, marginLeft: -300, fontWeight: 200 }}>
            แบบสอบถามการได้ยินห้านาทีฉบับภาษาไทยมีตัวเลือก 4 ตัวเลือก ดังนี้
          </p>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            paddingLeft: 50,
            paddingRight: 50,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              paddingLeft: 20,
              borderTop: "1px solid black",
              borderBottom: "1px solid black",
              paddingTop: 5,
              paddingBottom: 5,
              marginTop: -30,
            }}
          >
            <span style={{ width: 150 }}>ตัวเลือก</span>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <span style={{ marginLeft: 150, width: "30%" }}>ความหมาย</span>
              <span style={{ marginLeft: 150, width: "15%" }}>
                มีค่าคะแนนเท่ากับ
              </span>
            </div>
          </div>

          <div
            style={{
              flexDirection: "row",
              display: "flex",
              paddingLeft: 23,
              width: "100%",
              marginBottom: 5,
            }}
          >
            <span style={{ width: "24%", fontSize: 15 }}>ไม่เคย</span>
            <span style={{ width: "40%", fontSize: 15 }}>
              ไม่เคยประสบปัญหาเหล่านี้ หรือไม่มีประสบการณ์ดังกล่าวเกิดขึ้นเลย
            </span>
            <span style={{ width: "7%", marginLeft: 317, fontSize: 15 }}>
              0
            </span>
          </div>

          <div
            style={{
              flexDirection: "row",
              display: "flex",
              paddingLeft: 23,
              width: "100%",
              marginBottom: 5,
            }}
          >
            <span style={{ width: "24%", fontSize: 15 }}>เป็นครั้งคราว</span>
            <span style={{ width: "40%", fontSize: 15 }}>
              เคยประสบปัญหาเหล่านี้หรือมีประสบการณ์ดังกล่าวบ้างแต่นาน ๆ ครั้ง
            </span>
            <span style={{ width: "7%", marginLeft: 317, fontSize: 15 }}>
              1
            </span>
          </div>

          <div
            style={{
              flexDirection: "row",
              display: "flex",
              paddingLeft: 23,
              width: "100%",
              marginBottom: 5,
            }}
          >
            <span style={{ width: "16%", marginRight: 92, fontSize: 15 }}>
              ครั้งหนึ่ง
            </span>
            <span style={{ width: "45%", fontSize: 15 }}>
              ประสบประหาเหล่านี้หรือมีประสบการณ์ดังกล่าวบ่อยพอ ๆ
              กันกับช่วงเวลาที่ไม่เป็น
            </span>
            <span style={{ width: "7%", marginLeft: 260, fontSize: 15 }}>
              2
            </span>
          </div>

          <div
            style={{
              flexDirection: "row",
              display: "flex",
              paddingLeft: 23,
              width: "100%",
              marginBottom: 5,
            }}
          >
            <span style={{ width: "24%", fontSize: 15 }}>เกือบตลอด</span>
            <span style={{ width: "40%", fontSize: 15 }}>
              ประสบประหาเหล่านี้หรือมีประสบการณ์ดังกล่าวเป็นประจำ
            </span>
            <span style={{ width: "7%", marginLeft: 317, fontSize: 15 }}>
              3
            </span>
          </div>
        </div>

        <div
          style={{
            padding: 30,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <p style={{ fontSize: 17, marginLeft: -300, marginTop: -20 }}>
            ผู้ทดสอบการได้ยินจะต้องตอบทุกข้อ โดยเลือกให้ตรงกับท่านมากที่สุด
          </p>
          <p style={{ marginTop: 10, fontSize: 18, fontWeight: 500 }}>
            แบบสอบถามการได้ยินห้านาทีฉบับภาษาไทย
          </p>
        </div>


{/* แบบทดสอบ */}
        <div
  style={{
    display: "grid",
    gridTemplateColumns: "1fr repeat(4, minmax(0, 1fr))",
    // gap: "10px",
    paddingLeft: 60,
    paddingRight:60,
  }}
>

    {/* หัวเรื่อง */}
  <div style={{width:500,border: "1px solid #000",paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span>คำถาม</span>
  </div>
  <div style={{border: "1px solid #000",width:161,paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span>เกือบตลอด</span>
  </div>
  <div style={{border: "1px solid #000",width:162,paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span >ครึ่งหนึ่ง</span>
  </div>
  <div style={{border: "1px solid #000",width:161,paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span>เป็นครั้งคราว</span>
  </div>
  <div style={{border: "1px solid #000",width:165,paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span>ไม่เคย</span>
  </div>

{/* คำถาม 1*/}
  <div style={{width:500,border: "1px solid #000",paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span>1.ฉันมีปัญหาในการฟังเสียงโทรศัพท์</span>
  </div>
  <div style={{border: "1px solid #000",width:161,paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span></span>
  </div>
  <div style={{border: "1px solid #000",width:162,paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span ></span>
  </div>
  <div style={{border: "1px solid #000",width:161,paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span></span>
  </div>
  <div style={{border: "1px solid #000",width:165,paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span></span>
  </div>


  {/* คำถาม 2*/}
  <div style={{width:500,border: "1px solid #000",paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span>2.ฉันมีความลําบากที่จะปะติดปะต่อเรื่องที่สนทนาเวลามีคนตั้งแต่ 2 คนขึ้นไปพูดพร้อมกัน</span>
  </div>
  <div style={{border: "1px solid #000",width:161,paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span></span>
  </div>
  <div style={{border: "1px solid #000",width:162,paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span ></span>
  </div>
  <div style={{border: "1px solid #000",width:161,paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span></span>
  </div>
  <div style={{border: "1px solid #000",width:165,paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span></span>
  </div>

   {/* คำถาม 3*/}
   <div style={{width:500,border: "1px solid #000",paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span>3.คนทั่วไปบ่นว่าฉันเปิดทีวีเสียงดัง</span>
  </div>
  <div style={{border: "1px solid #000",width:161,paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span></span>
  </div>
  <div style={{border: "1px solid #000",width:162,paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span ></span>
  </div>
  <div style={{border: "1px solid #000",width:161,paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span></span>
  </div>
  <div style={{border: "1px solid #000",width:165,paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span></span>
  </div>


 {/* คำถาม 4*/}
 <div style={{width:500,border: "1px solid #000",paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span>4.ฉันต้องพยายามอย่างหนักที่จะเข้าใจการสนทนา</span>
  </div>
  <div style={{border: "1px solid #000",width:161,paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span></span>
  </div>
  <div style={{border: "1px solid #000",width:162,paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span ></span>
  </div>
  <div style={{border: "1px solid #000",width:161,paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span></span>
  </div>
  <div style={{border: "1px solid #000",width:165,paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span></span>
  </div>

   {/* คำถาม 5*/}
 <div style={{width:500,border: "1px solid #000",paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span>5.ฉันไม่ได้ยินเสียงทั่วๆไป เช่น โทรศัพท์หรือกริ่งประตู</span>
  </div>
  <div style={{border: "1px solid #000",width:161,paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span></span>
  </div>
  <div style={{border: "1px solid #000",width:162,paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span ></span>
  </div>
  <div style={{border: "1px solid #000",width:161,paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span></span>
  </div>
  <div style={{border: "1px solid #000",width:165,paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span></span>
  </div>

     {/* คำถาม 6*/}
 <div style={{width:500,border: "1px solid #000",paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span>6.ฉันมีความลําบากในการฟังการสนทนาในที่ที่มีเสียงรบกวน เช่น งานเลี้ยง</span>
  </div>
  <div style={{border: "1px solid #000",width:161,paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span></span>
  </div>
  <div style={{border: "1px solid #000",width:162,paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span ></span>
  </div>
  <div style={{border: "1px solid #000",width:161,paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span></span>
  </div>
  <div style={{border: "1px solid #000",width:165,paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span></span>
  </div>


       {/* คำถาม 7*/}
 <div style={{width:500,border: "1px solid #000",paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span>7.ฉันรู้สึกสับสนว่าเสียงมาจากทางไหน</span>
  </div>
  <div style={{border: "1px solid #000",width:161,paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span></span>
  </div>
  <div style={{border: "1px solid #000",width:162,paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span ></span>
  </div>
  <div style={{border: "1px solid #000",width:161,paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span></span>
  </div>
  <div style={{border: "1px solid #000",width:165,paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span></span>
  </div>


       {/* คำถาม 8*/}
 <div style={{width:500,border: "1px solid #000",paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span>8.ฉันไม่เข้าใจคําบางคําในประโยคและจําเป็นต้องขอให้คนพูดซ้ำ</span>
  </div>
  <div style={{border: "1px solid #000",width:161,paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span></span>
  </div>
  <div style={{border: "1px solid #000",width:162,paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span ></span>
  </div>
  <div style={{border: "1px solid #000",width:161,paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span></span>
  </div>
  <div style={{border: "1px solid #000",width:165,paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span></span>
  </div>


       {/* คำถาม 9*/}
 <div style={{width:500,border: "1px solid #000",paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span>9.ฉันมีปัญหาโดยเฉพาะอย่างยิ่งในการทําความเข้าใจคําพูดของผู้หญิงและเด็ก</span>
  </div>
  <div style={{border: "1px solid #000",width:161,paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span></span>
  </div>
  <div style={{border: "1px solid #000",width:162,paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span ></span>
  </div>
  <div style={{border: "1px solid #000",width:161,paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span></span>
  </div>
  <div style={{border: "1px solid #000",width:165,paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span></span>
  </div>


    {/* คำถาม 10*/}
 <div style={{width:500,border: "1px solid #000",paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span>10.ฉันทํางานในที่ๆมีเสียงดัง เช่น โรงงาน 
ขุดเจาะถนน เครื่องจักรไอพ่น เป็นต้น
</span>
  </div>
  <div style={{border: "1px solid #000",width:161,paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span></span>
  </div>
  <div style={{border: "1px solid #000",width:162,paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span ></span>
  </div>
  <div style={{border: "1px solid #000",width:161,paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span></span>
  </div>
  <div style={{border: "1px solid #000",width:165,paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span></span>
  </div>


     {/* คำถาม 11*/}
 <div style={{width:500,border: "1px solid #000",paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span>11.คนหลายคนที่ฉันคุยด้วยดูเหมือนจะพูดพึมพัมหรือพูดไม่ชัด
</span>
  </div>
  <div style={{border: "1px solid #000",width:161,paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span></span>
  </div>
  <div style={{border: "1px solid #000",width:162,paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span ></span>
  </div>
  <div style={{border: "1px solid #000",width:161,paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span></span>
  </div>
  <div style={{border: "1px solid #000",width:165,paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span></span>
  </div>


   {/* คำถาม 12*/}
 <div style={{width:500,border: "1px solid #000",paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span>12.คนทั่วไปรู้สึกรําคาญ เพราะฉันไม่เข้าใจว่าเขาพูดอะไร
</span>
  </div>
  <div style={{border: "1px solid #000",width:161,paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span></span>
  </div>
  <div style={{border: "1px solid #000",width:162,paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span ></span>
  </div>
  <div style={{border: "1px solid #000",width:161,paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span></span>
  </div>
  <div style={{border: "1px solid #000",width:165,paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span></span>
  </div>


    {/* คำถาม 13*/}
 <div style={{width:500,border: "1px solid #000",paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span>13.ฉันไม่เข้าใจในสิ่งที่คนอื่นกําลังพูดทําให้ตอบสนองไม่เหมาะสม
</span>
  </div>
  <div style={{border: "1px solid #000",width:161,paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span></span>
  </div>
  <div style={{border: "1px solid #000",width:162,paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span ></span>
  </div>
  <div style={{border: "1px solid #000",width:161,paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span></span>
  </div>
  <div style={{border: "1px solid #000",width:165,paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span></span>
  </div>


{/* คำถาม 14*/}
<div style={{width:500,border: "1px solid #000",paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span>14.ฉันเลี่ยงงานสังคม เพราะว่าฉันได้ยินไม่ดีและกลัวว่าจะตอบไม่ตรงคําถาม
</span>
  </div>
  <div style={{border: "1px solid #000",width:161,paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span></span>
  </div>
  <div style={{border: "1px solid #000",width:162,paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span ></span>
  </div>
  <div style={{border: "1px solid #000",width:161,paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span></span>
  </div>
  <div style={{border: "1px solid #000",width:165,paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span></span>
  </div>


  {/* คำถาม 15*/}
<div style={{width:500,border: "1px solid #000",paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span>15.ข้อนี้ให้คนในครอบครัวหรือเพื่อนตอบคำถามแทน  คุณคิดว่าบุคคลนี้มีปัญหาการได้ยินหรือไม่
</span>
  </div>
  <div style={{border: "1px solid #000",width:161,paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span></span>
  </div>
  <div style={{border: "1px solid #000",width:162,paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span ></span>
  </div>
  <div style={{border: "1px solid #000",width:161,paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span></span>
  </div>
  <div style={{border: "1px solid #000",width:165,paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span></span>
  </div>


    {/* รวม */}
<div style={{width:500,border: "1px solid #000",paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span>รวม
</span>
  </div>
  <div style={{border: "1px solid #000",width:161,paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span></span>
  </div>
  <div style={{border: "1px solid #000",width:162,paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span ></span>
  </div>
  <div style={{border: "1px solid #000",width:161,paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span></span>
  </div>
  <div style={{border: "1px solid #000",width:165,paddingLeft:5,paddingTop:4,paddingBottom:5}}>
    <span></span>
  </div>


</div>

    <div style={{height:50}}></div>
      </div>
    </div>
  );
}

export default Assessmentform;
