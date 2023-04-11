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
	  
		// navigate('/instructor/dashboard');
	  };
	  

    return (

        <div className="container2">
    <Link to="/employer/workouts">
      <button className='btn btn-block  mt-4 mb-4 w-50' style={{backgroundColor: '#d9dce2'}}> <i className='fa fa-arrow-left'></i>{" "}Back</button>
      </Link>
            <h2 class="text-center">Create A New Workout</h2>
		<hr/>
            <form onSubmit={onSubmit}>
            <div class="row mt-4">
            <div class="col-md-4">
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
		    </div>
			<div class="col-md-4">
			<label>Image Url</label>
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
				<label>Equipments</label>
				<ReactQuill
					type='text'
					placeholder='equipments'
					name="equipments"
					value={equipments}
					onChange={(value) => { onChange("equipments", value) }}
					required
					modules={{
						toolbar: [
							[{ 'header': '1' }, { 'header': '2' }],
							['bold', 'italic', 'underline', 'blockquote'],
							[{ 'list': 'ordered' }, { 'list': 'bullet' },],
							['link'],
							['clean']
						]
						
					}}
					
				/>

				</div>
		    </div>
			<div class="col-md-4">

			<label>Workout</label>
			<ReactQuill
					value={workoutSchedule}
					onChange={(value) => { onChange("workoutSchedule", value) }}
					modules={{
						toolbar: [
							[{ 'header': '1' }, { 'header': '2' }],
							['bold', 'italic', 'underline', 'blockquote'],
							[{ 'list': 'ordered' }, { 'list': 'bullet' },],
							['link'],
							['clean']
						],
						
					}}
					rows={12}
					placeholder='Workout'
					className="mb-4"
					required
					name='workoutSchedule'
				/>
			 
				
			
			 
			

            </div>
            </div>
            
            
      <div>
        <center>
        <input
          type='submit'
          value='Create'
          className='btn btn-primary btn-block mb-4 w-50'
        />
        </center>
        
      </div>
    </form>
        </div>

        
    )
};

export default CreateWorkout;