import User, { UserDocument } from '../models/model.users'
import { NotFoundError } from '../helpers/apiError'

const createUser = async (User: UserDocument): Promise<UserDocument> => {
  return User.save()
  
}

const findUserById = async (userId: string): Promise<UserDocument> => {
  const foundUser = await User.findById(userId)
  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`)
  }
  return foundUser
}

const findAllUsers = async (): Promise<UserDocument[]> => {
  return User.find().sort({ id: 1, name: 1 })
}

const updateUser = async (
  userId: string,
  update: Partial<UserDocument>
): Promise<UserDocument | null> => {
  const foundUser = await User.findByIdAndUpdate(userId, update, {
    new: true,
  })
  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`)
  }
  return foundUser
}

const deleteUser = async (userId: string): Promise<UserDocument | null> => {
  const foundUser = User.findByIdAndDelete(userId)
  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`)
  }
  return foundUser
}

export default {
  createUser,
  findUserById,
  findAllUsers,
  updateUser,
  deleteUser,
}
