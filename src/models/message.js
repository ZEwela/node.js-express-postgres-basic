const getMessageModel = (seqeuelize, { DataTypes }) => {
    const Message = seqeuelize.define('message', {
        text: {
           type: DataTypes.STRING,
           allowNull: false,
           validate: {
            notEmpty: true,
           },
        },
    });

    Message.associate = (models) => {
        Message.belongsTo(models.User);
    };

    return Message;
};

export default getMessageModel;