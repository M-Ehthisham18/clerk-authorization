import { Inngest } from "inngest";
import User from '../models/user.model.js';

export const inngest = new Inngest({ id: "Clerk-Authorization" });

// user creating function
const syncUserCreation = inngest.createFunction(
  {id : "demo-user-create"},
  {event: "clerk/user.created"},

  async ({ event }) => {
    const {id, full_name, email_addresses, image_url} = event?.data;

    const userData = {
      _id : id,
      email: email_addresses[0].email_address,
      fullName : full_name,
      image: image_url
    };

    await User.create(userData);
  }
);

// user deleting function
const syncUserDeletion = inngest.createFunction(
  {id: "demo-user-delete"},
  {event: "clerk/user.deleted"},

  async( { event }) => {
    const {id} = event?.data;
    await User.findOneAndDelete({_id : id})
  }
);

// user updating function
const syncUserUpdation = inngest.createFunction(
  {id : "demo-user-update"},
  { event : "clerk/user.updated"},

  async ( { event } ) => {
    const {id, full_name, email_addresses, image_url} = event?.data; 

    await User.findOneAndUpdate(
      {_id: id},
      {$set:{
        email: email_addresses[0].email_address,
        fullName : full_name,
        image: image_url
      }},
      {new: true}
    )
  }
)


export const functions = [
  syncUserCreation,
  syncUserDeletion,
  syncUserUpdation
];