import React, { useState , useEffect } from 'react'
import axios from 'axios'
import { useNavigate , useParams } from 'react-router-dom'
import { RiInformationLine } from 'react-icons/Ri'

import '../../styles/base/sub.css'
import '../../styles/base/goodsStyle.css'


const GoodsEditForm = () => {
  const { no } = useParams();
  const navigate = useNavigate();

  /* 굿즈 정보 */
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [content, setContent] = useState("");
  const [sale_yn, setSale_yn] = useState("");
  const [inventory, setInventory] = useState("");

  // 기존 정보 가져오기
  useEffect(() => {
    const fetchGoodsInfo = async () => {
      try {
        const response = await axios.get(`/api/goods/${no}`);
        const goodsData = response.data;
        console.log(response.data);
        setName(goodsData[0].goods.name);
        setPrice(goodsData[0].goods.price);
        setInventory(goodsData[0].goods.inventory);
        setContent(goodsData[0].goods.content);
        setSale_yn(goodsData[0].goods.sale_yn);
      } catch (error) {
				console.log("Error fetching goods info:", error);
			}
    };
    fetchGoodsInfo();
  }, [no]);


  // 수정 정보 저장 및 이미지 업로드
  const handleUpdateGoods = async (e) => {
    e.preventDefault();
    try {
      axios.put(`/api/goods/${no}`, {
        name: name,
        price: price,
        content: content,
        inventory: inventory,
        sale_yn: sale_yn,
        images_no: null
      });
      alert('상품 수정 완료');
      navigate('/goods');
      
    } catch(err) {
      console.log('상품 수정 에러  : ' + err);
      alert('상품 수정 실패');
    }
    
  };

  // handleCancel
  const handleCancel = () => {
    if(confirm("수정을 취소하시겠습니까?") === true) {
      return navigate('/goods');
    } else {
      return null;
    };
  };


  return (
    <main id="pageContainer" className="goods typeEdit">
      <section className='dateSection'>
        <div className='sectionInner'>
          <label>판매상태</label>
          <select name="sale_yn" onChange={(e) => setSale_yn(e.target.value)}>
            <option value="Y">판매가능</option>
            <option value="N">품절</option>
          </select>
        </div>
        <div className='sectionInner styleDouble'>
          <div>
            <label>수량</label>
            <input type='number' value={inventory} className='cnt' onChange={(e) => setInventory(e.target.value)} min={1} />
            <span>개</span>
          </div>
          <div>
          <label>판매가</label>
            <input type='number' value={price} className='price' onChange={(e) => setPrice(e.target.value)} min={100} />
            <span>원</span>
          </div>
        </div>
      </section>
      <section className='formSection'>
        <div className='sectionInner'>
          <label>상품명</label>
          <input type='text' placeholder='상품명을 입력하세요.' value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className='sectionInner'>
          <label>상세정보</label>
          <textarea placeholder='상세정보를 입력하세요.' value={content}onChange={(e) => setContent(e.target.value)} />
        </div>
      </section>
      <section className='imgSection'>
        <div className='sectionInner'>
          <label>썸네일 이미지 <small>&#40;600*600&#41;</small></label>
          <input type="file" className='thumbnailImage' disabled />
        </div>
        <div className='sectionInner'>
          <label>내용 이미지 <small>&#40;5MB 이하&#41;</small></label>
          <input type="file" className='thumbnailImage' disabled />
        </div>
        <div className="caption"><RiInformationLine/><b>상품 이미지 수정은 불가합니다.</b></div>
      </section>
      <section className="btnSection">
        <button className="submit" type="submit" onClick={handleUpdateGoods}> 수정하기 </button>
        <button className="cancel" type="button" onClick={handleCancel}>취소</button>
      </section>
    </main>
  )
}

export default GoodsEditForm