const notificationModel = require('../../models/notifications/notification.model');

class NotificationService {
    static createNotification = async (notificationData) => {
        try {
            const newNotification = new notificationModel(notificationData);
            await newNotification.save();
            return { message: 'Notification created successfully', notification: newNotification };
        } catch (error) {
            throw new Error('Error creating notification');
        }
    }

    static getNotificationsByUserId = async (userId) => {
        try {
            const notifications = await notificationModel.find({ userId }).sort({ createdAt: -1 });
            return notifications;
        } catch (error) {
            throw new Error('Error fetching notifications');
        }
    }

    static markNotificationAsRead = async (notificationId) => {
        try {
            const notification = await notificationModel.findByIdAndUpdate(
                notificationId,
                { isRead: true },
                { new: true }
            );
            if (!notification) {
                throw new Error('Notification not found');
            }
            return notification;
        } catch (error) {
            throw new Error('Error marking notification as read');
        }
    }

    static deleteNotification = async (notificationId) => {
        try {
            const notification = await notificationModel.findByIdAndDelete(notificationId);
            if (!notification) {
                throw new Error('Notification not found');
            }
            return { message: 'Notification deleted successfully' };
        } catch (error) {
            throw new Error('Error deleting notification');
        }
    }
}

module.exports = NotificationService;
