// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract VotingDapp {
    uint256 totalVotes=0;
    uint256 totalCandidates=0;
    bool electionStarted=false;
    address manager;
    string winner;

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

    modifier isElectionActive() {
        require(electionStarted == true);
        _;
    }

    function startElection() external {
        // start election. The election should not be active.
        electionStarted = true;
        manager = msg.sender;
    }

    function endElection() external isManager{
        // end election. The election should be active. Only manager can end election.
        electionStarted = false;
        manager = address(0);
        totalCandidates = 0;
        delete Candidates;
    }

    function becomeCandidate(string calldata _name, uint256 _age, uint256 _votes) external {
        // register as candidate. The election should not be active.
        Candidates.push(Candidate({
            candidateName: _name,
            candidateAge: _age,
            totalVotes: _votes
        }));
    }

    function vote() external isElectionActive{
        // vote candidate. The election should be active.
    }

    function currentStatus() external {
        // get total number of votes of each candidate at the moment. The election should be active. Anyone can see current status.
    }

    function getResult() external {
        // get winner of the election. The election should not be active. Anyone can see the result.
    }
}