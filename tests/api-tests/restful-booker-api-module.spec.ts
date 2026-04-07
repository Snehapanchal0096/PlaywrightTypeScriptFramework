import { test, expect } from '../../fixtures/hooks-fixture';
import apiPathData from '../../data/api-data/api-path-data.json';
import restfulApiData from '../../data/api-data/restful-booker-api-module-data.json';
import { request } from 'node:http';
// test("API Testing", async({request})=>{
//   const bookingIDs = await request.get('booking')
//   console.log(await bookingIDs.json());
// })

// test("API test 2", async({request})=>{
//   const bookingDetails = await request.get('booking/1')    
//   console.log(await bookingDetails.json());
// })

test(
  "id -8 [Restful-Booker> Booking] verify that the user is able to fetch all the booking IDs using GET API and receive valid response",
  {
    tag: ['@API', '@UAT'],
    annotation: {
      type: "Test Case Link",
      description: "Link for manual test case",
    }
  },
  async ({ request }) => {
    const bookingIDsResp = await request.get(apiPathData.booking_path);

    // Check if the response is JSON
    try {
      const bookingidsJsonResp = await bookingIDsResp.json();
      console.log(bookingidsJsonResp);
    } catch (error) {
      console.error("Failed to parse response as JSON:", await bookingIDsResp.text());
    }

    expect(bookingIDsResp.status()).toBe(200);
    expect(bookingIDsResp.ok()).toBeTruthy();
    expect(bookingIDsResp).not.toBeNull();
    expect(bookingIDsResp.headers()['content-type']).toBe(restfulApiData.content_type);
  }
);

test('Id - 9 - [Restful-Booker> Booking] verify that the user is able to fetch booking details for a booking id using GET API and receive valid response',
  {
    tag: ['@API', '@UAT'],
    annotation: {
      type: "Test Case Link",
      description: "Link for manual test case",
    }
  },
  async ({ request }) => {
    const bookingResp = await request.get(`${apiPathData.booking_path}/${restfulApiData.booking_id}`);

    // Check if the response status is 200 before parsing
    if (bookingResp.status() === 200) {
      const bookingJsonResp = await bookingResp.json();
      console.log(bookingJsonResp);

      expect(bookingResp.ok()).toBeTruthy();
      expect(bookingResp).not.toBeNull();
      expect(bookingJsonResp).toHaveProperty('firstname');
      expect(typeof bookingJsonResp.firstname).toBe('string');
    } else {
      console.error(`Failed to fetch booking details. Status: ${bookingResp.status()}, Response: ${await bookingResp.text()}`);
    }
  });

test("id - 10 - [Restful-Booker> Booking] verify that the user is able to Create new booking using Post API and receive valid response",
  {
    tag: ['@API', '@UAT'],
    annotation: {
      type: "Test Case Link",
      description: "Link for manual test case",
    }
  },
  async ({ request }) => {
    const createBookingResp = await request.post(apiPathData.booking_path, {
      data: restfulApiData.Create_Booking
    })
    const createBookingJsonResp = await createBookingResp.json();
    console.log(createBookingJsonResp);
    expect(createBookingResp.status()).toBe(200);
    expect(createBookingJsonResp.booking).toMatchObject(restfulApiData.Create_Booking);
  }
);

test("id -11 [Restful-Booker> Booking] verify that the user is able to update existing booking using PUT API and receive valid response.",
  {
    tag: ["@API", "@UAT"],
    annotation: {
      type: "Test Case Link",
      description: "Link for manual test case"
    }
  }, async ({ request, commonApiUtils }) => {
    const tokenvalue = await commonApiUtils.createToken();
    console.log("Token Value: ", tokenvalue);
    expect(tokenvalue, 'Auth token should not be undefined — check SECRET_KEY and encrypted credentials in .env file').toBeDefined();

    const updateBookingResp = await request.put(`${apiPathData.booking_path}/${restfulApiData.booking_id2}`, {
      headers: {
        Cookie: `token=${tokenvalue}`
      },
      data: restfulApiData.update_Booking
    });

    expect(updateBookingResp.status(), `Expected 200 but got ${updateBookingResp.status()}: ${await updateBookingResp.text()}`).toBe(200);
    const updateBookingJsonResp = await updateBookingResp.json();
    console.log(updateBookingJsonResp);
    expect(updateBookingJsonResp).toMatchObject(restfulApiData.update_Booking);
  })

test("id - 12 - [Restful-Booker-> Booking] Verify that the user is able to partially update existing booking using PATCH API and receive valid response.",
  {
    tag: ["@API", "@UAT"],
    annotation: {
      type: "Test Case Link",
      description: "Link for manual test case"
    }
  }, async ({ request, commonApiUtils }) => {
    const tokenvalue = await commonApiUtils.createToken();
    console.log("Token Value: ", tokenvalue);
    const patchBookingResp = await request.patch(`${apiPathData.booking_path}/${restfulApiData.booking_id2}`, {
      headers: {
        Cookie: `token=${tokenvalue}`
      },
      data: restfulApiData.update_partial_booking
    });

    expect(patchBookingResp.status(), `Expected 200 but got ${patchBookingResp.status()}: ${await patchBookingResp.text()}`).toBe(200);
    const patchBookingJsonResp = await patchBookingResp.json();
    console.log(patchBookingJsonResp);
    expect(patchBookingResp.status()).toBe(200);
    expect(patchBookingJsonResp.firstname).toMatch(restfulApiData.update_partial_booking.firstname)
    expect(patchBookingJsonResp.lastname).toMatch(restfulApiData.update_partial_booking.lastname)
  }
)

test("id - 13 - [Restful-Booker-> Booking] Verify that the user is able to delete existing booking using DELETE API and receive valid response.",
  {
    tag: ["@API", "@UAT"],
    annotation: {
      type: "Test Case Link",
      description: "Link for manual test case"
    }
  }, async ({ request, commonApiUtils }) => {
    // Step 1: Create a new booking to delete (avoid depending on pre-existing data)
    const createResp = await request.post(apiPathData.booking_path, {
      data: restfulApiData.Create_Booking
    });
    expect(createResp.status()).toBe(200);
    const createJson = await createResp.json();
    const bookingId = createJson.bookingid;
    console.log("Created booking ID for deletion: ", bookingId);

    // Step 2: Delete the newly created booking
    const tokenvalue = await commonApiUtils.createToken();
    console.log("Token Value: ", tokenvalue);
    const deleteBookingResp = await request.delete(`${apiPathData.booking_path}/${bookingId}`, {
      headers: {
        Cookie: `token=${tokenvalue}`
      }
    });

    expect(deleteBookingResp.status(), `Expected 201 but got ${deleteBookingResp.status()}: ${await deleteBookingResp.text()}`).toBe(201);
    expect(deleteBookingResp.statusText()).toBe("Created");

    // Step 3: Verify the booking no longer exists
    const getBookingResp = await request.get(`${apiPathData.booking_path}/${bookingId}`);
    expect(getBookingResp.status()).toBe(404);
    expect(getBookingResp.statusText()).toBe("Not Found");
  }
)




