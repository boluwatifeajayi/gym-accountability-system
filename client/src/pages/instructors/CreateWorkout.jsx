import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createWorkout } from "../../../features/workout/workoutSlice";
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
		description: '',
		duration: '',
		difficulty: '',
		tags: '',
		imageLink: '',
		equipments: '',
		workoutSchedule: [
		  {
			day: '',
			exercises: [
			  {
				name: '',
				reps: '',
				image: '',
				complete: false,
			  },
			],
		  },
		],
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
		workoutSchedule: [{ day, exercises }],
	  } = formData;
	  
	const dispatch = useDispatch()

	const onChange = (name, value) => {
		if (name.startsWith("exercises")) {
		  const [fieldName, index, subFieldName] = name.split(".");
		  setFormData((prevProfile) => ({
			...prevProfile,
			workoutSchedule: prevProfile.workoutSchedule.map((dayObj, i) => {
			  if (i === parseInt(index)) {
				return {
				  ...dayObj,
				  exercises: dayObj.exercises.map((exerciseObj, j) => {
					if (j === parseInt(subFieldName)) {
					  return {
						...exerciseObj,
						[fieldName]: value,
					  };
					}
					return exerciseObj;
				  }),
				};
			  }
			  return dayObj;
			}),
		  }));
		} else {
		  setFormData((prevProfile) => ({
			...prevProfile,
			[name]: value,
		  }));
		}
	  };
	  
     

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

        <div className="container2">
             <Link to="/employer/internships">
      <button className='btn btn-block  mt-4 mb-4 w-50' style={{backgroundColor: '#d9dce2'}}> <i className='fa fa-arrow-left'></i>{" "}Back</button>
      </Link>
            <h2 class="text-center">Create A New Internship</h2>
		<hr/>
            <form onSubmit={onSubmit}>
            <div class="row mt-4">
            <div class="col-md-4">
				<div className="form-group create-form">
				<input
					type='text'
					placeholder='Internship Title'
					name='workoutName'
                    value={workoutName}
                    onChange={(e)=>{onChange(e.target.name,e.target.value)}}
					className="form-input mb-4"
					required
            	/>
				
				<select value={workoutProfile} required style={{paddingLeft: 15,}} className="form-input mb-4" name="workoutProfile"  onChange={(e)=>{onChange(e.target.name,e.target.value)}}>
				<option value="" disabled hidden>
          -Internship Category-
        </option>
                  {InternshipCategory.map(st => (
                    <option key={st.value} value={st.value}>
                      {st.text}
                    </option>
                  ))}
                </select>

				<div class="row">
					<div class="col-md">
						<input
							type='number'
							placeholder='Number Of Openings'
                            name="numberOfOpenings"
							value={numberOfOpenings}
                            onChange={(e)=>{onChange(e.target.name,e.target.value)}}
							className="form-input mb-4"
							required
            			/>
					</div>
					<div class="col-md">
						
						<select value={workoutType} required style={{paddingLeft: 15,}} className="form-input mb-4" name="workoutType"   onChange={(e)=>{onChange(e.target.name,e.target.value)}}>
                  {InternshipTypes.map(st => (
                    <option key={st.value} value={st.value}>
                      {st.text}
                    </option>
                  ))}
                </select>
					</div>
				</div>
				<div class="row">
					<div class="col-md">
						<select value={salary} required style={{paddingLeft: 15,}} name="salary"  className="form-input mb-4"  onChange={(e)=>{onChange(e.target.name,e.target.value)}}>
                  {Salary.map(st => (
                    <option key={st.value} value={st.value}>
                      {st.text}
                    </option>
                  ))}
                </select>
					</div>
					<div class="col-md">
					
						<select value={duration} required style={{paddingLeft: 15,}} name="duration"  className="form-input mb-4"  onChange={(e)=>{onChange(e.target.name,e.target.value)}}>
                  {Duration.map(st => (
                    <option key={st.value} value={st.value}>
                      {st.text}
                    </option>
                  ))}
                </select>
					</div>
				</div>
				<div class="row">
					<div class="col-md">
						
						<select value={experienceLevel} required style={{paddingLeft: 15,}} name="experienceLevel"  className="form-input mb-4"  onChange={(e)=>{onChange(e.target.name,e.target.value)}}>
                  {ExperienceLevel.map(st => (
                    <option key={st.value} value={st.value}>
                      {st.text}
                    </option>
                  ))}
                </select>
					</div>
					<div class="col-md">
						
						<select value={educationLevel} required style={{paddingLeft: 15,}} name="educationLevel"  className="form-input mb-4"  onChange={(e)=>{onChange(e.target.name,e.target.value)}}>
                  {EducationLevel.map(st => (
                    <option key={st.value} value={st.value}>
                      {st.text}
                    </option>
                  ))}
                </select>
					</div>
				</div>
				
				
				</div>
		    </div>
			<div class="col-md-4">
			<label>Application Deadline</label>
			<input
					type='date'
					placeholder='Application Deadline'
					name='applicationDeadline'
					value={applicationDeadline}
					onChange={(e)=>{onChange(e.target.name,e.target.value)}}
					className="form-input mb-4"
					required
            	/>
				
				
                
                <select value={place} required style={{paddingLeft: 15,}} name="place"  className="form-input mb-4" onChange={(e)=>{onChange(e.target.name,e.target.value)}}>
                  {States.map(st => (
                    <option key={st.value} value={st.value}>
                      {st.text}
                    </option>
                  ))}
                </select>
            
				
				<div className="form-group">
				<label>Skills Needed</label>
				<ReactQuill
					value={skillsRequired}
					onChange={(value) => { onChange("skillsRequired", value) }}
					modules={{
						toolbar: [
							[{ 'header': '1' }, { 'header': '2' }],
							['bold', 'italic', 'underline', 'blockquote'],
							[{ 'list': 'ordered' }, { 'list': 'bullet' },],
							['link'],
							['clean']
						]
						
					}}
					rows={12}
					placeholder='Skills Required'
					className="mb-4 text-quill"
					required
					name='skillsRequired'
				/>

			
			  
				</div>
		    </div>
			<div class="col-md-4">
			<label>Internship Description</label>
			<ReactQuill
					value={workoutDescription}
					onChange={(value) => { onChange("workoutDescription", value) }}
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
					placeholder='Workout Description'
					className="mb-4"
					required
					name='workoutDescription'
				/>
			 
				<div className="form-group">
				<label>Interns Responsibilies</label>
				<ReactQuill
					value={benefits}
					onChange={(value) => { onChange("benefits", value) }}
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
					placeholder='Internship Benefits'
					className="mb-4"
					required
					name='benefits'
				/>
				<label>Application Information Tom Students</label>
				<ReactQuill
					value={applicationInfo}
					onChange={(value) => { onChange("applicationInfo", value) }}
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
					placeholder='Application Information For Students'
					className="mb-4"
					required
					name='applicationInfo'
				/>
			 
				</div>

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