// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract VotingDapp {
    uint256 public totalVotes=0;
    uint256 public totalCandidates=0;
    bool public electionStarted=false;
    address public manager;
    string public winner;
    uint256 initialIndex;

    struct Candidate {
        string candidateName;
        uint256 candidateAge;
        uint256 totalVotes;
        uint256 index;
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
        // start election. The election should not be active. The person who starts election is the manager.
        electionStarted = true;
        manager = msg.sender;
    }

    function endElection() external isManager{
        // end election. The election should be active. Only manager can end election.
        electionStarted = false;
        manager = address(0);
        totalCandidates = 0;
        totalVotes = 0;
        delete Candidates;
        initialIndex=0;
    }

    function becomeCandidate(string calldata _name, uint256 _age) external {
        // register as candidate. The election should not be active.
        Candidates.push(Candidate({
            candidateName: _name,
            candidateAge: _age,
            totalVotes: 0,
            index:initialIndex
        }));
        totalCandidates = totalCandidates + 1;
        initialIndex = initialIndex + 1;
    }
    function getCandidate(uint256 _index) view external returns(string memory _name,uint256 _age){
        Candidate storage candidate = Candidates[_index];
        return (candidate.candidateName,candidate.candidateAge);
    }

    function vote(uint256 _index) external isElectionActive{
        // vote candidate. The election should be active.
        Candidates[_index].totalVotes = Candidates[_index].totalVotes + 1;
        totalVotes = totalVotes + 1;
    }

    function currentStatus(uint256 _index) view external returns(string memory _candidateName,uint256 _totalVotes) {
        // get total number of votes of each candidate at the moment. The election should be active. Anyone can see current status.
        Candidate storage candidate = Candidates[_index];
        return (candidate.candidateName,candidate.totalVotes);
    }

   function winningProposal() public view returns (uint winningProposal_) {
        uint winningVoteCount = 0;
        for (uint p = 0; p < totalCandidates; p++) {
            if (Candidates[p].totalVotes > winningVoteCount) {
                winningVoteCount = Candidates[p].totalVotes;
                winningProposal_ = p;
            }
        }
    }
     function winnerName() public {
        winner= Candidates[winningProposal()].candidateName;
    }
}