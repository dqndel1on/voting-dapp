// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract VotingDapp {
    uint256 public totalVotes=0;
    uint256 public totalCandidates=0;
    bool public electionStarted=false;
    address public manager;
    string public winner;

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
    }

    function becomeCandidate(string calldata _name, uint256 _age) external {
        // register as candidate. The election should not be active.
        Candidates.push(Candidate({
            candidateName: _name,
            candidateAge: _age,
            totalVotes: 0
        }));
        totalCandidates = totalCandidates + 1;
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

    function getResult() external returns(string memory _candidateName,uint256 _totalVotes){
        // get winner of the election. The election should not be active. Anyone can see the result.
        uint256 i=0;
        uint256 leader=0;
        uint256 leaderIndex=0;
        for (i=0; i<=totalCandidates; i++){
            if(Candidates[i].totalVotes >=leader){
            leader = Candidates[i].totalVotes;
            leaderIndex = i;
            }
        }
        Candidate storage candidate = Candidates[leaderIndex];
        winner = candidate.candidateName;
        return (candidate.candidateName,candidate.totalVotes);
    }
}