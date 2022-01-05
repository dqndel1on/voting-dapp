/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface VotingDappInterface extends utils.Interface {
  functions: {
    "Candidates(uint256)": FunctionFragment;
    "becomeCandidate(string,uint256)": FunctionFragment;
    "currentStatus(uint256)": FunctionFragment;
    "endElection()": FunctionFragment;
    "getResult()": FunctionFragment;
    "startElection()": FunctionFragment;
    "vote(uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "Candidates",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "becomeCandidate",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "currentStatus",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "endElection",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "getResult", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "startElection",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "vote", values: [BigNumberish]): string;

  decodeFunctionResult(functionFragment: "Candidates", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "becomeCandidate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "currentStatus",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "endElection",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getResult", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "startElection",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "vote", data: BytesLike): Result;

  events: {};
}

export interface VotingDapp extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: VotingDappInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    Candidates(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber, BigNumber] & {
        candidateName: string;
        candidateAge: BigNumber;
        totalVotes: BigNumber;
      }
    >;

    becomeCandidate(
      _name: string,
      _age: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    currentStatus(
      _index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber] & { _candidateName: string; _totalVotes: BigNumber }
    >;

    endElection(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getResult(
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber] & { _candidateName: string; _totalVotes: BigNumber }
    >;

    startElection(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    vote(
      _index: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  Candidates(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [string, BigNumber, BigNumber] & {
      candidateName: string;
      candidateAge: BigNumber;
      totalVotes: BigNumber;
    }
  >;

  becomeCandidate(
    _name: string,
    _age: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  currentStatus(
    _index: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [string, BigNumber] & { _candidateName: string; _totalVotes: BigNumber }
  >;

  endElection(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getResult(
    overrides?: CallOverrides
  ): Promise<
    [string, BigNumber] & { _candidateName: string; _totalVotes: BigNumber }
  >;

  startElection(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  vote(
    _index: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    Candidates(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber, BigNumber] & {
        candidateName: string;
        candidateAge: BigNumber;
        totalVotes: BigNumber;
      }
    >;

    becomeCandidate(
      _name: string,
      _age: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    currentStatus(
      _index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber] & { _candidateName: string; _totalVotes: BigNumber }
    >;

    endElection(overrides?: CallOverrides): Promise<void>;

    getResult(
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber] & { _candidateName: string; _totalVotes: BigNumber }
    >;

    startElection(overrides?: CallOverrides): Promise<void>;

    vote(_index: BigNumberish, overrides?: CallOverrides): Promise<void>;
  };

  filters: {};

  estimateGas: {
    Candidates(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    becomeCandidate(
      _name: string,
      _age: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    currentStatus(
      _index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    endElection(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getResult(overrides?: CallOverrides): Promise<BigNumber>;

    startElection(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    vote(
      _index: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    Candidates(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    becomeCandidate(
      _name: string,
      _age: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    currentStatus(
      _index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    endElection(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getResult(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    startElection(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    vote(
      _index: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
