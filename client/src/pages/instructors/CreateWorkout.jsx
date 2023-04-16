import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {createWorkout} from "../../features/workout/workoutSlice"
import { useNavigate, Link } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.snow.css';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import Header from "../../components/Header";



const CreateWorkout = () => {
    const navigate = useNavigate()
	const [formData, setFormData] = useState({
		workoutName: '',
		category: '',
		description: 'some desc',
		duration: '',
		difficulty: '',
		tags: 'taggies',
		imageLink: '',
		equipments: '',
		workoutSchedule: ''
	  });
	  
    
	  const {
		workoutName,
		category,
		description,
		duration,
		difficulty,
		tags,
		imageLink,
		equipments,
		workoutSchedule,
	  } = formData;
	  
	const dispatch = useDispatch()
	const onChange = (name,value) => setFormData((prevProfile)=>({...prevProfile,[name]:value}));

	  const onSubmit = (e) => {
		e.preventDefault();
	  
		const workoutData = {
		  workoutName,
		  category,
		  description,
		  duration,
		  difficulty,
		  tags,
		  imageLink,
		  equipments,
		  workoutSchedule,
		};
	  
		dispatch(createWorkout(workoutData));
	  
		navigate('/instructor/dashboard');
	  };
	  

    return (
	<div>
		<Header/>
		<div className="container2">
   
            <h2 class="text-2xl font-bold">Create A New Workout</h2>
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
					placeholder='Workout Title'
					name='workoutName'
                    value={workoutName}
                    onChange={(e)=>{onChange(e.target.name,e.target.value)}}
					className="form-input mb-4"
					required
            	/>

				<input
					type='text'
					placeholder='Workout category'
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

			<label>Workout Details</label>

			<ReactQuill
    value={workoutSchedule} // Initial value of the editor
    onChange={(value) => { onChange("workoutSchedule", value) }} // Callback function to handle changes in the editor's content
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
    name='workoutSchedule' // Name attribute for the editor input
/>

            </div>
            </div>
      <div>
        <center>
        <input
          type='submit'
          value='Create'
          className='normal-btn mb-4 w-50'
        />
        </center>
        
      </div>
    </form>
        </div>
	</div>
    

        
    )
};

export default CreateWorkout;