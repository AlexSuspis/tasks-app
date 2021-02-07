
                    <ul>
                        <%for(subtask of task.subtasks){%>
                            <li><%=subtask.text%></li>
                            <span><img src="/pen.svg" alt="" height="15px" width="15px"></span>
                        <%}%>
                    </ul>