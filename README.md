# CPSC 304 Project Group 90 - 2023 Winter Session Term 1 (Sept-Dec)
*Based on the provided [starter project](https://github.students.cs.ubc.ca/CPSC304/CPSC304_Node_Project)*
#
# [Milestone 4 Deliverables Link](https://github.students.cs.ubc.ca/CPSC304-2023W-T1/project_g4l8c_i8w2b_u9b3b#milestone-4)
| Name         | Student Number | CS Aliases (Userid) | Preferred E-mail Address  |
|--------------|----------------|---------------------|---------------------------|
| Brandon Yuen | 40390817       | i8w2b               | brandonyuen2001@gmail.com |
| Celine Chen  | 44176873       | g4l8c               | celinechen1114@gmail.com  |
| Joshua Chew  | 95081204       | u9b3b               | joshuagchew@gmail.com     |

By typing our names and student numbers in the above table, we certify that the work in the attached assignment was performed solely by those whose names and student IDs are included above.

In addition, we indicate that we are fully aware of the rules and consequences of plagiarism, as set forth by the Department of Computer Science and the University of British Columbia

## Project Summary
The domain of this application is the entertainment industry, specifically focused on Disney Resorts. It encompasses various aspects of providing information to guests about these resorts, their residing theme parks, and the smaller themed “lands” within those. This database will facilitate the efficient management of guest information, merchandise, food, and attractions found in each resort, such as rides and shows.

### [Milestone 1](https://github.students.cs.ubc.ca/CPSC304-2023W-T1/project_g4l8c_i8w2b_u9b3b/blob/main/docs/Milestone%201.pdf)
### [Milestone 2](https://github.students.cs.ubc.ca/CPSC304-2023W-T1/project_g4l8c_i8w2b_u9b3b/blob/main/docs/Milestone%202.pdf)
### [Milestone 3](https://github.students.cs.ubc.ca/CPSC304-2023W-T1/project_g4l8c_i8w2b_u9b3b/blob/main/docs/Milestone%203.md)
# Milestone 4
### [Milestone 4 Cover Page](https://github.students.cs.ubc.ca/CPSC304-2023W-T1/project_g4l8c_i8w2b_u9b3b/blob/main/docs/304%20Project%20Cover%20Page.pdf)
### [Milestone 4 SQL Script](https://github.students.cs.ubc.ca/CPSC304-2023W-T1/project_g4l8c_i8w2b_u9b3b/blob/main/disneyResorts.sql)
### [Milestone 4 Document](https://github.students.cs.ubc.ca/CPSC304-2023W-T1/project_g4l8c_i8w2b_u9b3b/blob/main/docs/Milestone%204.pdf)

#
## [Deployment Guide](https://www.students.cs.ubc.ca/~cs-304/resources/javascript-oracle-resources/node-setup.html)
*assumes your ssh is configured for `remote.students.cs.ubc.ca`*
1. `ssh remote`
2. navigate to project repo directory
3. `sh ./remote-start.sh`
4. open new terminal
5. navigate to project repo directory
6. build tunnel to remote node application
    - Mac users:
      - `sh ./scripts/mac/server-tunnel.sh`
    - Windows users:
      - `.\scripts\win\server-tunnel.cmd`

## Killing the Server
try `ctrl + c` in the server shell process

if you don't have access to the session, follow these steps:
1. `ssh remote`
2. `lsof -i`
3. identify your server processes (name should match port specified when building server, command should be 'node')
4. note the associated PIDs
5. `kill <pid>`

*alternatively* `kill $(lsof -ti:<your port number>)`
