import { Modal, Button, Spin, Form, Input, DatePicker } from "antd";
import './psagrademodal.css';
import {createOrUpdatePsaGrade} from '../../../Helpers/FirebaseHelper';
import { useEffect } from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const PsaGradeModal = ({ isPsaGradeModalVisible, handleCancel, card, setId, cardData }) => {

    const [form] = Form.useForm();
    const navigate = useNavigate();

    const handleSubmit = async values => {
        const sendAt = values.sendAt ? values.sendAt.toDate() : null;
        const receivedAt = values.receivedAt ? values.receivedAt.toDate() : "notReceived";
        const grade = values.grade ? values.grade : 'no grade';   
        const comments = values.comments ? values.comments : 'no comments'; // default comments value
      
        const gradeData = {...values, sendAt, receivedAt, grade, comments};  // Include 'comments' in your data
          
        if(card && setId && card.id) {
          await createOrUpdatePsaGrade(setId, card.id, gradeData);
          handleCancel(); 
          navigate('/psa');
        } else {
          console.log('Card data missing', card);
        }
      }

      useEffect(() => {
        if(cardData) {
          form.setFieldsValue({
            sendAt: cardData.sendAt ? moment(cardData.sendAt.toDate()) : null,
            receivedAt: moment(cardData.receivedAt) !== 'Invalid date' ? moment(cardData.receivedAt) : null,
            grade: cardData.grade,
            comments: cardData.comments,
          });
        }
      }, [cardData, form]);
    
    return ( 
        isPsaGradeModalVisible ? (
            <Modal 
                title="Card Details" 
                visible={isPsaGradeModalVisible} 
                onCancel={handleCancel} 
                footer={null} 
                maskClosable={false}
                width={'80%'}
            >
                { cardData && card && setId ? (
                    <>
                    <div className='title_container'>
                        <h2>{card.name} | {card.number}</h2>
                        <img src={card.set.images.symbol} alt={card.name} />
                    </div>
                    <div className="modal_container">
                        <img src={card.images.small} alt={card.name} />
                        <div className="form_container">
                        <Form form={form} layout="vertical" onFinish={handleSubmit}>
                            <Form.Item name="sendAt" label="Sent At" rules={[{ required: true }]}>
                                <DatePicker />
                            </Form.Item>
                            <Form.Item name="receivedAt" label="Received At" rules={[{ required: false }]}>
                                <DatePicker />
                            </Form.Item>
                            <Form.Item name="grade" label="Grade" rules={[{ required: false }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="comments" label="Comments">
                                <Input.TextArea />
                            </Form.Item>
                            <Form.Item>
                            <Button type="primary" htmlType="submit">
                                 Submit
                            </Button>
                        </Form.Item>
                        </Form>
                        </div>
                    </div>
                    </> ) : (
                    <div className="spinner_loader_container">
                        <Spin size="large" />
                    </div> )

                }
            </Modal> ) : null
    );
};

export default PsaGradeModal;