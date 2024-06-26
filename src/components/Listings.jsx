import Nav from './Nav'
import HouseCard from './HouseCard'
import { useState, useEffect } from 'react'
import axios from 'axios'
axios.defaults.withCredentials = true

function Listings() {
  const [listings, setListings] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchListings() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/listings`
        )
        setListings(response.data)
      } catch (error) {
        console.error('Error fetching listings:', error)
      }
    }

    fetchListings()
  }, [])

  const createHouse = async (event) => {
    event.preventDefault() // Prevent page reload
    const formData = new FormData(event.target)
    const formObject = Object.fromEntries(formData.entries())

    formObject.photos = formData.getAll('photos')

    try {
      // Send houseData to the API
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/houses`,
        formObject
      )
      //add error message
      if (response.data.error) {
        setError(response.data.error)
      } else {
        // Update state with the newly created house object
        setListings((prevListings) => [...prevListings, response.data])
      }
    } catch (error) {
      console.error('Error creating house:', error)
    }
  }

  const listOfListings = listings.map((house, index) => (
    <HouseCard key={index} house={house} isListing={true} />
  ))
  return (
    <div className="container px-2 md:mx-auto">
      <Nav />
      <form onSubmit={createHouse}>
        <div className="border border-gray-200 p-2 rounded-md mt-2">
          <div className="grid gap-32 lg:grid-cols-2">
            {/* col 1 */}
            <div className="grid items-center">
              <div>List a house</div>
              <div className=" text-gray-400 mt-2 text-sm">Location</div>
              <input
                name="location"
                type="text"
                className="border border-gray-200 rounded-md p-2 w-full placeholder-black"
              />
              <div className=" text-gray-400 mt-2 text-sm">Bedrooms</div>
              <input
                name="bedrooms"
                type="number"
                className="border border-gray-200 rounded-md p-2 w-full placeholder-black"
              />
              <div className=" text-gray-400 mt-2 text-sm">Bathrooms</div>
              <input
                name="bathrooms"
                type="number"
                className="border border-gray-200 rounded-md p-2 w-full placeholder-black"
              />
              <div className=" text-gray-400 mt-2 text-sm">Price per Night</div>
              <input
                name="price_per_night"
                type="number"
                className="border border-gray-200 rounded-md p-2 w-full placeholder-black"
              />
              <div className=" text-gray-400 mt-2 text-sm">Description</div>
              <textarea
                type="text"
                name="description"
                className="border border-gray-200 rounded-md p-2 w-full text-sm"
                rows="4"
              ></textarea>
            </div>
            {/* col 2 */}
            <div>
              <div className=" text-gray-400 mt-2 text-sm">Photos</div>
              <input
                name="photos"
                type="text"
                className="border border-gray-200 rounded-md p-2 w-full placeholder-black"
              />
              <input
                name="photos"
                type="text"
                className="border border-gray-200 rounded-md p-2 w-full mt-2 placeholder-black"
              />
              <input
                name="photos"
                type="text"
                className="border border-gray-200 rounded-md p-2 w-full mt-2 placeholder-black"
              />
              <input
                name="photos"
                type="text"
                className="border border-gray-200 rounded-md p-2 w-full mt-2 placeholder-black"
              />
              <input
                name="photos"
                type="text"
                className="border border-gray-200 rounded-md p-2 w-full mt-2 placeholder-black"
              />
              <input
                name="photos"
                type="text"
                className="border border-gray-200 rounded-md p-2 w-full mt-2 placeholder-black"
              />
              <input
                name="photos"
                type="text"
                className="border border-gray-200 rounded-md p-2 w-full mt-2 placeholder-black"
              />
              <input
                name="photos"
                type="text"
                className="border border-gray-200 rounded-md p-2 w-full mt-2 placeholder-black"
              />
              <input
                name="photos"
                type="text"
                className="border border-gray-200 rounded-md p-2 w-full mt-2 placeholder-black"
              />
            </div>
          </div>
          {/* buttons */}
          <div className="flex justify-start gap-2 mt-2">
            <button className=" bg-rose-400 text-white rounded-md p-3">
              List House
            </button>
            {/* add error message */}
            {error ? (
              <span className="flex justify-center items-center text-red-500 text-xs">
                {error}
              </span>
            ) : null}
          </div>
        </div>
      </form>
      <div className="grid gap-4 my-5 xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        {listOfListings}
      </div>
    </div>
  )
}
export default Listings
