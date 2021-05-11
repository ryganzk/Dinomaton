const Discord = require('discord.js');
const config = require('../config.json');
usersDB = require('./schemas/user.js');
fightersDB = require('./schemas/fighter.js');
matchesDB = require('./schemas/match.js');

/*------------- USER COMMANDS -------------*/

//Creates the database to store users
module.exports.getUserDB = async function(userID) {
    let userDB = await usersDB.findOne(
        { id: userID }
    );
    if(userDB) {
        return userDB;
    } else {
        return false;
    }
};

module.exports.getUserDB = async function(userID, userTag) {
    let userDB = await usersDB.findOne(
        { id: userID }
    );
    if(userDB) {
        return userDB;
    } else {
        userDB = new usersDB({
            id: userID,
            tag: userTag
        })
        await userDB.save().catch(err => console.log(err));
        return userDB;
    }
};

module.exports.userDBExists = async function(userID) {
    let userDB = await usersDB.findOne(
        { id: userID }
    );
    if(userDB)
        return true;
    else
        return false;
};

/*------------ FIGHTER COMMANDS ------------*/

//Creates the database to store fighters
module.exports.setFighterDB = async function(fighterID, fighterTag) {
    fighterDB = new fightersDB({
        id: fighterID,
        fighterName: fighterTag
    });
    await fighterDB.save().catch(err => console.log(err));
    return fighterDB;
};

module.exports.getFighterDB = async function(fighterID) {
    let fighterDB = await fightersDB.findOne(
        { id: fighterID }
    );
    return fighterDB;
};

module.exports.fighterDBExists = async function(fighterID) {
    let fighterDB = await fightersDB.findOne(
        { id: fighterID },
        { licenseStatus: 'certified'}
    );
    if(fighterDB)
        return true;
    else
        return false;
};

module.exports.increaseWins = async function(fighterID) {
    let fighterDB = await fightersDB.findOneAndUpdate(
        { id: fighterID },
        {$inc:
            {battleWins: 1}
        }
    );
    await fighterDB.save().catch(err => console.log(err));
    return fighterDB;
};

module.exports.increaseLosses = async function(fighterID) {
    let fighterDB = await fightersDB.findOneAndUpdate(
        { id: fighterID },
        {$inc:
            {battleLosses: 1}
        }
    );
    await fighterDB.save().catch(err => console.log(err));
    return fighterDB;
};

module.exports.setFighterName = async function(fighterID, newFighterName) {
    let fighterDB = await fightersDB.findOneAndUpdate(
        { id: fighterID },
        {$set:
            {fighterName: newFighterName}
        }
    );
    await fighterDB.save().catch(err => console.log(err));
    return fighterDB;
}

/*------------ MATCH COMMANDS ------------*/

module.exports.setMatchDB = async function(challengerID, challengerName, challengeeID, challengeeName) {
    let matchDB = new matchesDB({
        idChallenger: challengerID,
        idChallengee: challengeeID,
        challenger: challengerName,
        challengee: challengeeName
    });
    await matchDB.save().catch(err => console.log(err));
    return matchDB;
}

module.exports.getMatchDB = async function(challengerID, challengeeID, matchStatus) {
    let matchDB = await matchesDB.findOne(
        { $and: [
            { idChallenger: challengerID },
            { idChallengee: challengeeID },
            { status: matchStatus }
        ]}
    );
    return matchDB;
};

module.exports.matchChallengerExists = async function(fighterID) {
    let matchChallenger = await matchesDB.findOne(
        { idChallenger: fighterID }
    );
    if(matchChallenger)
        return true;
    else
        return false;
};

module.exports.matchExists = async function(challengerID, challengeeID, statusArgs) {
    let match = await matchesDB.findOne(
        { $and: [
            { idChallenger: challengerID },
            { idChallengee: challengeeID },
            { $or: [
                { status: statusArgs[0] },
                { status: statusArgs[1] },
                { status: statusArgs[2] }
            ]}
        ]}
    );

    if(match)
        return match;
    else
        return false;
}

module.exports.matchWithUserExists = async function(userID, statusArgs) {
    let match = await matchesDB.findOne(
        { $and: [
            { $or: [
                { idChallenger: userID },
                { idChallengee: userID }
            ]},
            { $or: [
                { status: statusArgs[0] },
                { status: statusArgs[1] },
                { status: statusArgs[2] }
            ]}
        ]}
    );

    if(match)
        return match;
    else
        return false;
}
module.exports.amount = async function(statusArgs) {
    let count = await matchesDB.countDocuments(
        { $or: [
            { status: statusArgs[0] },
            { status: statusArgs[1] },
            { status: statusArgs[2] }
        ]}
    );
    return count;
}

module.exports.deleteMatches = async function(statusArgs) {
    let matchDB = await matchesDB.deleteMany(
        { $or: [
            { status: statusArgs[0] },
            { status: statusArgs[1] },
            { status: statusArgs[2] }
        ]}
    );
    return matchDB;
}


module.exports.setWinner = async function(match, fighterName) {
    let matchDB = await match.updateOne({ winner: fighterName });
    return matchDB;
}

module.exports.setLoser = async function(match, fighterName) {
    let matchDB = await match.updateOne({ loser: fighterName });
    return matchDB;
}

module.exports.acceptMatch = async function(match) {
    let matchDB = await match.updateOne({ status: 'accepted' });
    return matchDB;
}

module.exports.startMatch = async function(match) {
    let matchDB = await match.updateOne({ status: 'in progress' });
    return matchDB;
}

module.exports.completeMatch = async function(match) {
    let matchDB = await match.updateOne({ status: 'completed' });
    return matchDB;
}

module.exports.flagMatch = async function(match) {
    let matchDB = await match.updateOne({ status: 'flagged' });
    return matchDB;
}

module.exports.dropMatch = async function(match) {
    let matchDB = await match.updateOne({ status: 'dropped' });
    return matchDB;
}
