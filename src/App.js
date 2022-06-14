import React, {useEffect, lazy, Suspense} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Route, Routes, Navigate} from "react-router-dom";
import Layout from "./modules/common/hoc/Layout/Layout";
import "./App.css";
import ScrollToTop from "./modules/common/hooks/ScrollToTop/ScrollToTop";

import {loadTransactions} from "./reducers/transactions/transactions-slice";
import {loadCategories} from "./reducers/categories/categories-slice";
import {loadAccounts} from "./reducers/accounts/accounts-slice";
import {loadBudgets} from "./reducers/budget/budget-slice";
import {selectUserId} from "./reducers/user/user-slice";

// import {copyTransactions} from "./services/transaction-service";
// import {copyCategories} from "./services/category-service";
// import {copyAccounts} from "./services/account-service";
// import {update} from "./services/budget-service";

function App() {
  const TransactionsContainer = lazy(() => import("./modules/transactions/components/Container"));
  const StatisticsContainer = lazy(() => import("./modules/statistics/components/Container"));
  const SettingsContainer = lazy(() => import("./modules/settings/components/Container"));

  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);


// const budget = {
//     "2021": {
//         "December": {
//             "incomes": {
//                 "dfYxF6WORZwWX0TCXyRV": 30,
//                 "8vfHBz0wyDFG0fq1iF8C": 403,
//                 "Incomes": "433.00"
//             },
//             "expenses": {
//                 "nKOK7jOU01fGpd70etw9": 28,
//                 "aTkFZTiOoJvpLaQvtoWf": 98,
//                 "EvQv3el9EOjJWhCTkHe5": 20,
//                 "KzGwUDZLr3RQO04z8fDB": 20,
//                 "sfu9XxfjI1bg8kMIpb4Z": 134,
//                 "8rS6pO164e3PZUbsd7JQ": 18,
//                 "JdSclhcjOMiEht0FJnVk": 65,
//                 "H8wFykC5sU6jgrw1VF7H": 20,
//                 "Expenses": "403.00"
//             }
//         }
//     },
//     "2022": {
//         "February": {
//             "expenses": {
//                 "8rS6pO164e3PZUbsd7JQ": 35,
//                 "EvQv3el9EOjJWhCTkHe5": 9,
//                 "sfu9XxfjI1bg8kMIpb4Z": 148.58,
//                 "H8wFykC5sU6jgrw1VF7H": 5,
//                 "i6KpRfIY0SQc4sDhoPAp": 0,
//                 "JdSclhcjOMiEht0FJnVk": 92.75,
//                 "Expenses": "435.80",
//                 "KzGwUDZLr3RQO04z8fDB": 20,
//                 "nKOK7jOU01fGpd70etw9": 27.5,
//                 "aTkFZTiOoJvpLaQvtoWf": 97.97
//             },
//             "incomes": {
//                 "Incomes": "435.80",
//                 "dfYxF6WORZwWX0TCXyRV": 30,
//                 "8vfHBz0wyDFG0fq1iF8C": 405.8
//             }
//         },
//         "April": {
//             "incomes": {
//                 "8vfHBz0wyDFG0fq1iF8C": 449,
//                 "Incomes": "479.00",
//                 "dfYxF6WORZwWX0TCXyRV": 30
//             },
//             "expenses": {
//                 "KzGwUDZLr3RQO04z8fDB": 20,
//                 "sfu9XxfjI1bg8kMIpb4Z": 135,
//                 "aTkFZTiOoJvpLaQvtoWf": 97.97,
//                 "JdSclhcjOMiEht0FJnVk": 80.25,
//                 "Expenses": "419.72",
//                 "nKOK7jOU01fGpd70etw9": 27.5,
//                 "EvQv3el9EOjJWhCTkHe5": 13,
//                 "H8wFykC5sU6jgrw1VF7H": 12,
//                 "ECzqAGdfGoyrWZPgbvW1": 34
//             }
//         },
//         "January": {
//             "incomes": {
//                 "8vfHBz0wyDFG0fq1iF8C": 405.8,
//                 "dfYxF6WORZwWX0TCXyRV": 30,
//                 "Incomes": "435.80"
//             },
//             "expenses": {
//                 "EvQv3el9EOjJWhCTkHe5": 15,
//                 "sfu9XxfjI1bg8kMIpb4Z": 134,
//                 "nKOK7jOU01fGpd70etw9": 27.5,
//                 "GWF8D5Rb6biAxE8smc1c": 0,
//                 "i6KpRfIY0SQc4sDhoPAp": 1.55,
//                 "aTkFZTiOoJvpLaQvtoWf": 98,
//                 "KzGwUDZLr3RQO04z8fDB": 20,
//                 "Expenses": "405.80",
//                 "8rS6pO164e3PZUbsd7JQ": 20,
//                 "JdSclhcjOMiEht0FJnVk": 64.75,
//                 "H8wFykC5sU6jgrw1VF7H": 25
//             }
//         },
//         "March": {
//             "incomes": {
//                 "Incomes": "450.09",
//                 "8vfHBz0wyDFG0fq1iF8C": 420.09,
//                 "dfYxF6WORZwWX0TCXyRV": 30
//             },
//             "expenses": {
//                 "EvQv3el9EOjJWhCTkHe5": 7,
//                 "H8wFykC5sU6jgrw1VF7H": 23,
//                 "JdSclhcjOMiEht0FJnVk": 80.25,
//                 "8rS6pO164e3PZUbsd7JQ": 19.37,
//                 "Expenses": "420.09",
//                 "ECzqAGdfGoyrWZPgbvW1": 0,
//                 "KzGwUDZLr3RQO04z8fDB": 20,
//                 "nKOK7jOU01fGpd70etw9": 27.5,
//                 "sfu9XxfjI1bg8kMIpb4Z": 145,
//                 "aTkFZTiOoJvpLaQvtoWf": 97.97
//             }
//         },
//         "May": {
//             "expenses": {
//                 "aTkFZTiOoJvpLaQvtoWf": 97.97,
//                 "Expenses": "479.00",
//                 "KzGwUDZLr3RQO04z8fDB": 20,
//                 "8rS6pO164e3PZUbsd7JQ": 60,
//                 "H8wFykC5sU6jgrw1VF7H": 10,
//                 "ECzqAGdfGoyrWZPgbvW1": 30,
//                 "JdSclhcjOMiEht0FJnVk": 80.25,
//                 "EvQv3el9EOjJWhCTkHe5": 10,
//                 "nKOK7jOU01fGpd70etw9": 27.5,
//                 "sfu9XxfjI1bg8kMIpb4Z": 139.28,
//                 "RdSQfEpq4HSjtoOzrdkl": 4
//             },
//             "incomes": {
//                 "dfYxF6WORZwWX0TCXyRV": 30,
//                 "8vfHBz0wyDFG0fq1iF8C": 449,
//                 "Incomes": "479.00"
//             }
//         },
//         "June": {
//             "incomes": {
//                 "8vfHBz0wyDFG0fq1iF8C": 449,
//                 "Incomes": "479.00",
//                 "dfYxF6WORZwWX0TCXyRV": 30
//             },
//             "expenses": {
//                 "KzGwUDZLr3RQO04z8fDB": 20,
//                 "RdSQfEpq4HSjtoOzrdkl": 4,
//                 "Expenses": "478.68",
//                 "JdSclhcjOMiEht0FJnVk": 80.25,
//                 "ECzqAGdfGoyrWZPgbvW1": 30,
//                 "8rS6pO164e3PZUbsd7JQ": 67.46,
//                 "aTkFZTiOoJvpLaQvtoWf": 97.97,
//                 "sfu9XxfjI1bg8kMIpb4Z": 135,
//                 "H8wFykC5sU6jgrw1VF7H": 18,
//                 "nKOK7jOU01fGpd70etw9": 9,
//                 "EvQv3el9EOjJWhCTkHe5": 17
//             }
//         }
//     }
// };

  // copyTransactions();
  // copyCategories();
  // copyAccounts();
  // update(userId, budget);

  useEffect(() => {
    dispatch(loadTransactions(userId));
    dispatch(loadCategories(userId));
    dispatch(loadAccounts(userId));
    dispatch(loadBudgets(userId));
  }, [userId]);

  return (
    <Layout>
      <ScrollToTop />
        <Suspense>
          <Routes>
            <Route path="/" element={<TransactionsContainer />} />
            <Route path="/statistics" element={<StatisticsContainer />} />
            <Route path="/settings" element={<SettingsContainer />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
    </Layout>
  );
}

export default App;
