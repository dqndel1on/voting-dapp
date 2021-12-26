// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract VotingDapp {
    uint256 public totalVotes=0;
    uint256 public totalCandidates=0;
    bool public electionStarted=false;
    address public manager;

    struct Candidate {
        string candidateName;
        uint256 candidateAge;
        uint256 totalVotes;
    }

    Candidate[] public Candidates;

    modifier isManager() {
        require(msg.sender == manager);
        _;
    }

    modifier isElectionActive(bool _value) {
        require(electionStarted == _value);
        _;
    }

    function startElection() external {
        // start election. The election should not be active.
        electionStarted = true;
        manager = msg.sender;
    }

    function endElection() external isManager{
        // end election. The election should be active. Only manager can end election.
    }

    function becomeCandidate() external {
        // register as candidate. The election should not be active.
    }

    function vote() external {
        // vote candidate. The election should be active.
    }

    function currentStatus() external {
        // get total number of votes of each candidate at the moment. The election should be active. Anyone can see current status.
    }

    function getResult() external {
        // get winner of the election. The election should not be active. Anyone can see the result.
    }
}