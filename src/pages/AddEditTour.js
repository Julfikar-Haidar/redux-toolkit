import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createTour, updateTour } from "../redux/features/tourSlice";
// import TagInput from '../components/TagInput'
import '../components/Tags.css';

const initialState = {
  title: "",
  description: "",
  tags: [],
};

export default function AddEditTour() {
  const [tourData, setTourData] = useState(initialState);
  const [tagErrMsg, setTagErrMsg] = useState(null);
  const { error, userTours } = useSelector((state) => ({
    ...state.tour,
  }));
  const { user } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { title, description, tags } = tourData;
 

  useEffect(() => {
    if (id) {
      const singleTour = userTours.find((tour) => tour._id === id);
      console.log(singleTour);
      setTourData({ ...singleTour });
    }
    
  }, [id]);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!tags.length) {
      setTagErrMsg("Please provide some tags");
    }
    if (title && description && tags) {
      const updatedTourData = { ...tourData, name: user?.result?.name };

      if (!id) {
        dispatch(createTour({ updatedTourData, navigate, toast }));
      } else {
        dispatch(updateTour({ id, updatedTourData, toast, navigate }));
      }
      handleClear();
    }
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setTourData({ ...tourData, [name]: value });
  };

  const handleClear = () => {
    setTourData({ title: "", description: "", tags: [] });
  };

  const removeTagData = deleteTag => {

    setTourData({
      ...tourData,
      tags: tourData.tags.filter((tag) => tag !== deleteTag),
    });
  };

  const addTagData = event => {

    setTagErrMsg(null);
    if (event.target.value !== '') {
      setTourData({ ...tourData, tags: [...tourData.tags, event.target.value] });
      event.target.value = '';
    }
  };


  const onImageChange = event => {
    console.log(event.target.files[0]);
    let files = event.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);

    reader.onload = (e) => {
         
      setTourData({ ...tourData, imageFile: e.target.result })
    }
   
  
  };

  return (


    <>
     <div className="container-fluid">
        <div className="form-box">
          <h1>Add</h1>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input className="form-control" id="name" type="text" value={title || ""} name="title" placeholder="Name" onChange={onInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Image</label>
              <input className="form-control" accept="image/*" onChange={onImageChange}  type="file" />
            </div>
            <div className="form-group">
              <label htmlFor="message">Tag</label>
              <div className="tag-input">
                <ul className="tags">
                  {tags && tags.map((tag, index) => (
                    <li key={index} className="tag">
                      <span className="tag-title">{tag}</span>
                      <span
                        className="tag-close-icon"
                        onClick={() => removeTagData(tag)}
                      >
                        x
                      </span>
                    </li>
                  ))}
                </ul>
                <input
                  className="tag_input"
                  type="text"
                  onKeyUp={event => (event.key === 'Enter' ? addTagData(event) : null)}
                  placeholder="Press enter to add a tag"
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea className="form-control" id="message" value={description} name="description" placeholder="description" onChange={onInputChange} />
            </div>

            <input className="btn btn-primary" type="submit" defaultValue="Submit" />
          </form></div>


      </div>
    </>
  )
}
