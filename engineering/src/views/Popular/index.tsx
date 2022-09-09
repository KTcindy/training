import React, { Component } from "react";
import List from "@/components/list";
import baseFetch from "@/utils/require";
import "./index.css";

interface IAjaxData {
  q: string;
  sort: string;
  order: "desc" | "asc";
  type: string;
  page: number;
}

interface IState {
  flag: boolean;
  loading: boolean;
  titleList: string[];
  list: unknown[];
  active: any;
  ajaxData: IAjaxData;
}

export default class AppDemo extends Component<{}, IState> {
  state = {
    flag: false,
    loading: true,
    titleList: ["All", "Javascript", "Ruby", "Java", "Css", "Python"],
    list: [],
    active: "All",
    ajaxData: {
      q: "stars:>1",
      sort: "stars",
      order: "desc" as const,
      type: "Repositories",
      page: 1,
    },
  };
  URL = "/search/repositories";
  myRef = React.createRef<HTMLDivElement>();
  // 滚动触发事件
  handleScroll = () => {
    const { scrollHeight, clientHeight, scrollTop } = this.myRef.current!;
    const res = scrollHeight - clientHeight - scrollTop;
    if (!res) {
      this.setState(
        (prevstate: IState) => ({
          ajaxData: {
            ...prevstate.ajaxData,
            page: ++prevstate.ajaxData.page,
          },
        }),
        () => {
          this.init();
        }
      );
    }
  };

  componentDidMount() {
    this.init();
  }

  // 初始化方法
  init = () => {
    let { list } = this.state;
    baseFetch(this.URL, this.state.ajaxData)
      .then((res) => {
        let lists = list.concat(res.items);
        this.setState({ list: lists });
        this.setState({ flag: true });
      })
      .catch((err) => {
        alert("请求太频繁了");
      });
  };
  // 点击tab切换类型
  clickActive = (item) => {
    console.log(item, "---item---");
    this.setState({ list: [] });
    this.setState({ flag: false });
    this.setState({ active: item });
    let { q } = this.state.ajaxData;
    let _q = `stars:>1 language:${item}`;
    let _ajaxData = { ...this.state.ajaxData, q: _q };
    this.setState({ ajaxData: _ajaxData }, () => {
      this.init();
    });
  };
  render() {
    let { titleList, list, active, flag } = this.state;
    return (
      <div
        style={{ height: "calc(100vh)" }}
        className="overflow-x-hidden overflow-y-auto"
        ref={this.myRef}
        onScroll={() => this.handleScroll()}
      >
        <ul className="flex m-auto justify-center w-1/2">
          {titleList.map((item) => {
            return (
              <li
                className={[
                  "p-4",
                  "cursor",
                  active === item ? "active" : "",
                ].join(" ")}
                onClick={this.clickActive.bind(this, item)}
                key={item}
              >
                {item}
              </li>
            );
          })}
        </ul>
        <div className="">
          <List list={list} flag={flag} />
        </div>
      </div>
    );
  }
}
