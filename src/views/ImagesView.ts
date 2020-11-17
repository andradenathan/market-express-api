import { User }  from '../models/User'

export default {
    render(image: User){
        return {
            url: `http://localhost:5000/uploads/${image.photo}`
        };
    },
}