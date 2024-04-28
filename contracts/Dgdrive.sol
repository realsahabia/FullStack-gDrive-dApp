// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract Dgdrive {
    // DEFINING A STRUCTURE TO STORE USER ACCESS INFORMATION
    struct Access {
        address user;
        bool access;
    }

    // MAPPING FOR STORING DATA URLS BY USER ADDRESS
    mapping(address => string[]) data;
    // MAPPING TO TRACK OWNERSHIP AND ACCESS RIGHTS
    mapping(address => mapping(address => bool)) ownership;
    // PUBLIC MAPPING TO STORE ACCESS LISTS
    mapping(address => Access[]) public accessList;
    // MAPPING TO KEEP TRACK OF PREVIOUS DATA ACCESS
    mapping(address => mapping(address => bool)) prevUser;

    // EVENTS FOR LOGGING SIGNIFICANT ACTIONS
    event DataAdded(address indexed user, string url);
    event AccessGranted(address indexed owner, address indexed grantee);
    event AccessRevoked(address indexed owner, address indexed revokee);

    // FUNCTION TO ADD DATA FOR A USER
    function add(address _user, string memory url) external {
        data[_user].push(url); // ADD URL TO USER'S DATA ARRAY
        emit DataAdded(_user, url); // EMIT AN EVENT FOR DATA ADDITION
    }

    // FUNCTION TO ALLOW A NEW USER ACCESS TO THE SENDER'S DATA
    function allowUser(address newUser) external {
        ownership[msg.sender][newUser] = true; // GRANT OWNERSHIP RIGHT

        if (prevUser[msg.sender][newUser]) {
            for (uint i = 0; i < accessList[msg.sender].length; i++) {
                if (accessList[msg.sender][i].user == newUser) {
                    accessList[msg.sender][i].access = true; // SET ACCESS TO TRUE
                    emit AccessGranted(msg.sender, newUser); // EMIT ACCESS GRANTED EVENT
                    return; // EXIT ONCE THE ACCESS IS UPDATED
                }
            }
        } else {
            accessList[msg.sender].push(Access(newUser, true)); // ADD NEW ACCESS ENTRY
            prevUser[msg.sender][newUser] = true; // MARK AS PREVIOUSLY ACCESSED
            emit AccessGranted(msg.sender, newUser); // EMIT ACCESS GRANTED EVENT
        }
    }

    // FUNCTION TO REVOKE ACCESS FROM A USER
    function disAllowUser(address user) public {
        ownership[msg.sender][user] = false; // REVOKE OWNERSHIP RIGHT

        for (uint i = 0; i < accessList[msg.sender].length; i++) {
            if (accessList[msg.sender][i].user == user) {
                accessList[msg.sender][i].access = false; // SET ACCESS TO FALSE
                emit AccessRevoked(msg.sender, user); // EMIT ACCESS REVOKED EVENT
                break; // STOP THE LOOP ONCE THE USER IS FOUND
            }
        }
    }

    // FUNCTION TO DISPLAY DATA BASED ON USER PERMISSIONS
    function displayData(address _user) external view returns(string[] memory) {
        require(_user == msg.sender || ownership[_user][msg.sender], "You don't have access"); // CHECK ACCESS RIGHTS
        return data[_user]; // RETURN DATA IF ACCESS IS GRANTED
    }

    // FUNCTION TO SHARE CURRENT ACCESS STATUS
    function shareAccess() public view returns(Access[] memory) {
        return accessList[msg.sender]; // RETURN ACCESS LIST OF THE SENDER
    }
}
