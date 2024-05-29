import React from 'react'

function FooterComponent() {
  return (
    <div>
          <div style={{backgroundColor:'#fbff0066',paddingLeft:50,textAlign:'center',paddingTop:20,paddingBottom:5}}>
        <p style={{fontSize:25,fontWeight:600}}>จัดทำโดย</p>
        <div style={{backgroundColor:'#fbff001a',paddingLeft:50,textAlign:'center',paddingTop:20,paddingBottom:5,flexDirection:'row',display:'flex'}}>
        <p style={{fontSize:22,fontWeight:600,width:'32%'}}>นายอวิรุทธ์  ไชยสงคราม</p>
        <p style={{fontSize:22,fontWeight:600, width:'33%'}}>ผู้ช่วยศาสตราจารย์ ธีรเดช เทวาภินันท์</p>
        <p style={{fontSize:22,fontWeight:600,width:'33%'}}>นายแก้วขวัญ  ไกรเทพ</p>
    </div>

    </div>
    </div>
  )
}

export default FooterComponent