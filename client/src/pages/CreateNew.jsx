import {useState} from 'react'
import { createNew } from '../services/gitGameServices';
// import { uploadImage } from '../services/services';
import { useFormAction } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const CreateNew = () => {
  const {register, formState:{errors},handleSubmit} = useFormAction();
  const navigate = useNavigate();
//   const [urlImage,setUrlImage] = useState()

//   const urlGenerator = async (event) => {
//       const file = event.target.files[0]
//       const url_img = await uploadImage(file)
//       setUrlImage(url_img)
//   }

  const onSubmit = (data) =>{    
    // createNew({...data, url:urlImage.url})
    createNew({...data})
    navigate("/") 
  }

  return (
    <div>
      <div>
        <h2 >Agregar una noticia</h2>
      </div>

      <div >
        <form id="formAddMeme"  onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="name" >Dale un titulo a tu noticia</label>
            <div >
              <input type="text" {...register('name',{required:true})} ></input>
              {errors.name?.type === 'required' && <p>El campo de nombre es requerido</p>}
            </div>
          </div>
          <div>
            <label htmlFor="tags" >Palabras clave</label>
            <div className="mt-2">
              <input type="text" {...register('tags',{required:true})} ></input>
              {errors.tags?.type === 'required' && <p>Es necesario asignar una palabra clave</p>}
            </div>
          </div>
          {/* <div>
            <label htmlFor="url" >Subir imagen</label>
            <div >
              <input id="url" type="file" accept='image/*' {...register('url',{
                required:'Es necesario subir una foto', 
                validate:{checkFileType: (fileList) => {
                  return (
                    fileList && fileList[0]?.type.startsWith('image/')
                  ) || 'El archivo debe ser una imagen';
              }}})} onChange={urlGenerator}/>
              {errors.url && <p>{errors.url.message}</p>}
            </div>
          </div> */}
          <div>
            <input type="submit" value="Agregar meme" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNew;