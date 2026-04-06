import apiClient from './client'

export const getSubscribedBooklogs = (userNo) => apiClient.get(`/api/subscribers/${userNo}`)
export const getBooklogSubscribers = (userNo) => apiClient.get(`/api/subscribeBlog/${userNo}`)
export const cancelBooklogSubscription = (userNo, subscribedUserNo) =>
  apiClient.delete(`/api/subscriptions/${userNo}/${subscribedUserNo}`)
