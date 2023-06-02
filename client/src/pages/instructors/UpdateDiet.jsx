import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {updateDiet, getDietById, deleteDiet} from "../../features/diet/dietSlice"
import { useNavigate, Link, useParams } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.snow.css';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import Header from "../../components/Header";



const UpdateDiet = () => {
    const navigate = useNavigate();
const { id } = useParams(); 
const dispatch = useDispatch();

const {singleDiet, isLoading, isError, isSuccess, message} = useSelector((state) => state.diet);



  
//   useEffect(() => {
// 	const getDietById = async () => {
// 		dispatch(getDietById(id));
// 	  };
// 	return () => {
// 	  dispatch(reset());
// 	};
//   }, [dispatch, id, getDietById]);

// useEffect(() => {
//     if (isError) {
//         console.log(message);
//     }
// }, [isError, message, singleDiet]);

const [formData, setFormData] = useState({});

useEffect(() => {
  const fetchDiet = async () => {
    await dispatch(getDietById(id));
  };
  fetchDiet();
}, [dispatch, id]);

useEffect(() => {
  if (singleDiet) {
    setFormData({
      dietName: singleDiet.dietName,
      category: singleDiet.category,
      description: singleDiet.description,
      duration: singleDiet.duration,
      difficulty: singleDiet.difficulty,
      tags: singleDiet.tags,
      imageLink: singleDiet.imageLink,
      equipments: singleDiet.equipments,
      dietSchedule: singleDiet.dietSchedule,
    });
  
    console.log(singleDiet);
  }
}, [singleDiet, setFormData]);

const {
    dietName,
    category,
    description,
    duration,
    difficulty,
    tags,
    imageLink,
    equipments,
    dietSchedule,
} = formData;


const onChange = useCallback((name,value) => setFormData((prevProfile)=>({...prevProfile,[name]:value})), [setFormData]);



const onSubmit = async (e) => {
    e.preventDefault();
    const dietData = {
        dietName,
        category,
        description,
        duration,
        difficulty,
        tags,
        imageLink,
        equipments,
        dietSchedule,
    };
    
    try {
        await dispatch(updateDiet({  dietData, dietId:id, }));
       
        alert("Diet Updated")
        navigate(-1);
        
    } catch (error) {
        console.error('Error updating diet:', error);
        alert('Error updating diet:')
    }
};

    return (
	<div>
		<Header/>
		<div className="container2">
   
            <h2 class="text-2xl font-bold">Update This diet</h2>
			<Link to="/instructor/dashboard">
      <button className='btn btn-block  mt-4 mb-4 w-50' style={{backgroundColor: '#d9dce2'}}> <i className='fa fa-arrow-left'></i>{" "}Back</button>
      </Link>
		<hr/>
            <form onSubmit={onSubmit}>
            <div class="row mt-4">
            <div class="col-md-6">
				<div className="form-group create-form">
				<input
					type='text'
					placeholder='Diet Title'
					name='dietName'
                    value={dietName}
                    onChange={(e)=>{onChange(e.target.name,e.target.value)}}
					className="form-input mb-4"
					required
            	/>

				<input
					type='text'
					placeholder='Diet category'
					name='category'
                    value={category}
                    onChange={(e)=>{onChange(e.target.name,e.target.value)}}
					className="form-input mb-4"
					required
            	/>
				
				

				<div class="row">
					<div class="col-md">
						<input
							type='text'
							placeholder='Duration'
                            name="duration"
							value={duration}
                            onChange={(e)=>{onChange(e.target.name,e.target.value)}}
							className="form-input mb-4"
							required
            			/>
					</div>
					<div class="col-md">
					<input
							type='text'
							placeholder='Difficulty'
                            name="difficulty"
							value={difficulty}
                            onChange={(e)=>{onChange(e.target.name,e.target.value)}}
							className="form-input mb-4"
							required
            			/>
					</div>
				</div>
				
				</div>
				<div>
			
			<input
					type='url'
					placeholder='Image Url'
					name='imageLink'
					value={imageLink}
					onChange={(e)=>{onChange(e.target.name,e.target.value)}}
					className="form-input mb-4"
					required
            	/>

				<div className="form-group">
				
				<input
					type='text'
					placeholder='Equipments'
					name='equipments'
					value={equipments}
					onChange={(e)=>{onChange(e.target.name,e.target.value)}}
					className="form-input mb-4"
					required
            	/>

				</div>
		    </div>
		    </div>
			
			<div class="col-md-6">

			<label>Diet Details</label>

			<ReactQuill
    value={dietSchedule} // Initial value of the editor
    onChange={(value) => { onChange("dietSchedule", value) }} // Callback function to handle changes in the editor's content
    modules={{
        toolbar: [
            [{ 'header': '1' }, { 'header': '2' }], // Header styles
            ['bold', 'italic', 'underline', 'blockquote'], // Text styles
            [{ 'list': 'ordered' }, { 'list': 'bullet' }], // List styles
            ['link'], // Link insertion
            ['clean'] // Clean formatting
        ],
        // You can add additional modules here to extend the functionality of the editor
    }}
    rows={16} // Number of visible rows in the editor
    placeholder="Monday: 30 min. jog, 20 min. strength training..."// Placeholder text displayed when the editor is empty
    className="mb-4" // CSS class for styling
    required // Indicates that the editor input is required
    name='dietSchedule' // Name attribute for the editor input
/>

            </div>
            </div>
      <div>
        <center>
        <input
          type='submit'
          value='Update diet'
          className='normal-btn mb-4 w-50'
        />
        </center>
        
      </div>
    </form>
        </div>
	</div>
    

        
    )
};

export default UpdateDiet;