import React from 'react'

const UserPage = (props) => {
  return (
    <div>{props.id}</div>
  )
}

export default UserPage;

export async function getServerSideProps(context){

    /* const { params, req, res} = conext "we can also access the 
    request and the response, we can manipulate the res before having sent back" */
    const { params } = context
    const userId = params.uid


    return {
        props:{
            id: 'userid-' + userId,
        }
    }

}