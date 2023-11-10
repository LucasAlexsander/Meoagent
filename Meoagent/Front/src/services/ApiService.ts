export class ApiService{
  public async updateProfilePicture(entity: string, fr: FileReader, token: string){
    try {

      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/${entity}/`, {
        method: 'PUT',
        body: JSON.stringify({
          profilePicture: fr.result
        }),
        headers:{
          authorization: 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      })
      const text = await response.text()
  
      return text
      
    } catch (error) {
      console.log(error)
    }

  }

  public async updateCoverPicture(accountType: string, fr: FileReader, token: string){
    try {

      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/${accountType}/`, {
        method: 'PUT',
        body: JSON.stringify({
          coverPicture: fr.result
        }),
        headers:{
          authorization: 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      })
      const text = await response.text()
  
      return text
      
    } catch (error) {
      console.log(error)
    }

  }

  //-------------------------------------------------------------------

  //get
  //realtor information
  public async getRealtorInformation(accountId: string){
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/realtor/${accountId}`)
      const data = await response.json()
      return data
    } catch (error) {
      console.log(error)
    }
  }

  public async getAgencyInformation(accountId: string){
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/agency/${accountId}`)
      const data = await response.json()
      return data
    } catch (error) {
      console.log(error)
    }
  }

  //get
  //realtor services
  public async getRealtorServices(accountId: string){
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/service/realtor/${accountId}`)
      const data = await response.json()
      return data
    } catch (error) {
      console.log(error)
    }
  }

  //get
  //realtor properties
  public async getRealtorProperties(accountId: string){
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/property/realtor/${accountId}`)
      const data = await response.json()
      return data
    } catch (error) {
      console.log(error)
    }
  }

  //get
  //realtor awards
  public async getRealtorAwards(accountId: string){
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/award/realtor/${accountId}`)
      const data = await response.json()
      return data
    } catch (error) {
      console.log(error)
    }
  }

  //get
  //realtor courses
  public async getRealtorCourses(accountId: string){
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/course/realtor/${accountId}`)
      const data = await response.json()
      return data
    } catch (error) {
      console.log(error)
    }
  }

  //get
  //realtor partnership
  public async getRealtorPartnership(accountId: string){
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/partnership/realtor/${accountId}`)
      const data = await response.json()
      return data
    } catch (error) {
      console.log(error)
    }
  }

  //get
  //realtor comments
  public async getRealtorComments(accountId: string){
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comment/realtor/${accountId}`)
      const data = await response.json()
      return data
    } catch (error) {
      console.log(error)
    }
  }

  //-------------------------------------------------------------------

  //delete
  //realtor service
  public async deleteService(token: string, serviceId: number, accountType: string){
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/service/${accountType}/${serviceId}`, {
        method: 'DELETE',
        headers:{
          authorization: 'Bearer ' + token
        }
      })
      const text = await response.text()
      return text
    } catch (error) {
      console.log(error)
    }
  }

  //delete
  //realtor property
  public async deleteRealtorProperty(token: string, propertyId: string, entity: string){
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/property/${entity}/${propertyId}`, {
        method: 'DELETE',
        headers:{
          authorization: 'Bearer ' + token
        }
      })
      const text = await response.text()
      return text
    } catch (error) {
      console.log(error)
    }
  }

  //delete
  //realtor award
  public async deleteRealtorAward(token: string, awardId: string){
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/award/${awardId}`, {
        method: 'DELETE',
        headers:{
          authorization: 'Bearer ' + token
        }
      })
      const text = await response.text()
      return text
    } catch (error) {
      console.log(error)
    }
  }

  //delete
  //realtor courses
  public async deleteRealtorCourse(token: string, courseId: string){
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/course/${courseId}`, {
        method: 'DELETE',
        headers:{
          authorization: 'Bearer ' + token
        }
      })
      const text = await response.text()
      return text
    } catch (error) {
      console.log(error)
    }
  }

  //delete
  //realtor partnership
  public async deleteRealtorPartnership(token: string, partnershipId: string){
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/partnership/${partnershipId}`, {
        method: 'DELETE',
        headers:{
          authorization: 'Bearer ' + token
        }
      })
      const text = await response.text()
      return text
    } catch (error) {
      console.log(error)
    }
  }

  public async deleteComment(token: string, commentId: string){
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comment/realtor/${commentId}`, {
        method: 'DELETE',
        headers:{
          authorization: 'Bearer ' + token
        }
      })
      const text = await response.text()
      return text
    } catch (error) {
      console.log(error)
    }
  }

  //---------------------------------------------------------------------------------------

  //create
  //realtor service
  public async createRealtorService(localId: number, serviceId: number){
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/service/realtor`, {
        method: 'POST',
        body: JSON.stringify({
          serviceId: Number(serviceId),
          realtorId: Number(localId)
        }),
        headers:{
          'Content-Type': 'application/json'
        }
      })
      const text = await response.text()
      return text
    } catch (error) {
      console.log(error)
    }
  }

  //update
  //realtor about
  public async updateRealtorAbout(token: string, introduction: string){
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/realtor/`, {
        method: 'PUT',
        body: JSON.stringify({
          introduction
        }),
        headers:{
          authorization: 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      })
      const text = await response.text()
      return text
    } catch (error) {
      console.log(error)
    }
  }

  //create
  //realtor property
  public async createRealtorProperty(localId: number, data: any, pic: string, price: number, grossArea: number, usefulArea: number){
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/property`, {
        method: 'POST',
        body: JSON.stringify({
          propertyData:{
            ...data,
            price,
            grossArea,
            usefulArea,
            profilePicture: pic,
          },
          realtorId: Number(localId)
        }),
        headers:{
          'Content-Type': 'application/json'
        }
      })
      const text = await response.text()
      return text
    } catch (error) {
      console.log(error)
    }
  }

  //create
  //realtor award
  public async createRealtorAward(localId: number, title: any){
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/award`, {
        method: 'POST',
        body: JSON.stringify({
          title,
          realtorId: Number(localId)
        }),
        headers:{
          'Content-Type': 'application/json'
        }
      })
      const text = await response.text()
      return text
    } catch (error) {
      console.log(error)
    }
  }

  //create
  //realtor partnership
  public async createRealtorPartnership(localId: number, data: any){
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/partnership`, {
        method: 'POST',
        body: JSON.stringify({
          ...data,
          realtorId: Number(localId)
        }),
        headers:{
          'Content-Type': 'application/json'
        }
      })
      const text = await response.text()
      return text
    } catch (error) {
      console.log(error)
    }
  }


}

