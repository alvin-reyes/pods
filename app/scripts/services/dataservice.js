'use strict';

angular.module('erLoadUi')
    .service('dataService', function() {
    
    this.doctors = [
        {'id':0,'type':'Doctor','name':'Doctor 1','shift_start':'5:30','shift_end':'15:30'},
        {'id':1,'type':'Doctor','name':'Doctor 2','shift_start':'5:30','shift_end':'17:30'},
        {'id':2,'type':'Doctor','name':'Doctor 3','shift_start':'8:00','shift_end':'20:00'},
        {'id':3,'type':'Doctor','name':'Doctor 4','shift_start':'9:00','shift_end':'21:00'},
        {'id':4,'type':'Doctor','name':'Doctor 5','shift_start':'11:00','shift_end':'23:00'},
        {'id':5,'type':'Doctor','name':'Doctor 6','shift_start':'15:00','shift_end':'23:59'},
        {'id':6,'type':'Doctor','name':'Doctor 7','shift_start':'16:00','shift_end':'2:00'},
        {'id':7,'type':'Doctor','name':'Doctor 8','shift_start':'18:30','shift_end':'6:30'},
        {'id':8,'type':'Doctor','name':'Doctor 9','shift_start':'20:00','shift_end':'8:00'},
        {'id':9,'type':'Doctor','name':'Doctor 10','shift_start':'21:30','shift_end':'9:30'}
    ];
    
    this.rns = [
        {'id':0,'type':'Nurse','name':'RN Ivan','assigned_patient':[],'member_status':'inactive','shift_start':'7:00','shift_end':'19:00'},
        {'id':1,'type':'Nurse','name':'RN Jean','assigned_patient':[],'member_status':'inactive','shift_start':'7:00','shift_end':'19:00'},
        {'id':2,'type':'Nurse','name':'RN Kelly','assigned_patient':[],'member_status':'inactive','shift_start':'7:00','shift_end':'19:00'},
        {'id':3,'type':'Nurse','name':'RN Lance','assigned_patient':[],'member_status':'inactive','shift_start':'7:00','shift_end':'19:00'},
        {'id':4,'type':'Nurse','name':'RN Mary','assigned_patient':[],'member_status':'inactive','shift_start':'7:00','shift_end':'19:00'},
        {'id':5,'type':'Nurse','name':'RN Nel','assigned_patient':[],'member_status':'inactive','shift_start':'7:00','shift_end':'19:00'},
        {'id':6,'type':'Nurse','name':'RN Oscar','assigned_patient':[],'member_status':'inactive','shift_start':'7:00','shift_end':'19:00'},
        {'id':7,'type':'Nurse','name':'RN Paula','assigned_patient':[],'member_status':'inactive','shift_start':'7:00','shift_end':'19:00'},
        {'id':8,'type':'Nurse','name':'RN Ronald','assigned_patient':[],'member_status':'inactive','shift_start':'11:00','shift_end':'23:00'},
        {'id':9,'type':'Nurse','name':'RN Sally','assigned_patient':[],'member_status':'inactive','shift_start':'11:00','shift_end':'23:00'},
        {'id':10,'type':'Nurse','name':'RN Ted','assigned_patient':[],'member_status':'inactive','shift_start':'15:00','shift_end':'3:00'},
        {'id':11,'type':'Nurse','name':'RN Ursula','assigned_patient':[],'member_status':'inactive','shift_start':'15:00','shift_end':'3:00'},
        {'id':12,'type':'Nurse','name':'RN Vic','assigned_patient':[],'member_status':'inactive','shift_start':'15:00','shift_end':'3:00'},
        {'id':13,'type':'Nurse','name':'RN Wilma','assigned_patient':[],'member_status':'inactive','shift_start':'15:00','shift_end':'3:00'},
        {'id':14,'type':'Nurse','name':'RN Yam','assigned_patient':[],'member_status':'inactive','shift_start':'11:00','shift_end':'23:00'},
        {'id':15,'type':'Nurse','name':'RN Zach','assigned_patient':[],'member_status':'inactive','shift_start':'11:00','shift_end':'23:00'},
        {'id':16,'type':'Nurse','name':'RN Arnold','assigned_patient':[],'member_status':'inactive','shift_start':'19:00','shift_end':'7:00'},
        {'id':17,'type':'Nurse','name':'RN Belinda','assigned_patient':[],'member_status':'inactive','shift_start':'19:00','shift_end':'7:00'},
        {'id':18,'type':'Nurse','name':'RN Charlie','assigned_patient':[],'member_status':'inactive','shift_start':'19:00','shift_end':'7:00'},
        {'id':19,'type':'Nurse','name':'RN Donna','assigned_patient':[],'member_status':'inactive','shift_start':'19:00','shift_end':'7:00'},
        {'id':20,'type':'Nurse','name':'RN Ernie','assigned_patient':[],'member_status':'inactive','shift_start':'19:00','shift_end':'7:00'},
        {'id':21,'type':'Nurse','name':'RN Fiona','assigned_patient':[],'member_status':'inactive','shift_start':'19:00','shift_end':'7:00'},
        {'id':22,'type':'Nurse','name':'RN Glenn','assigned_patient':[],'member_status':'inactive','shift_start':'19:00','shift_end':'7:00'},
        {'id':23,'type':'Nurse','name':'RN Helen','assigned_patient':[],'member_status':'inactive','shift_start':'19:00','shift_end':'7:00'}
    ];
    
    this.steps = [
        {'id':0,'name':'step1','time_start':'','activity_logic':''},
        {'id':1,'name':'step2','time_start':'','activity_logic':''},
        {'id':2,'name':'step3','time_start':'','activity_logic':''},
        {'id':3,'name':'step4','time_start':'','activity_logic':''},
        {'id':4,'name':'step5','time_start':'','activity_logic':''},
        {'id':5,'name':'step6','time_start':'','activity_logic':''},
        {'id':6,'name':'step7','time_start':'','activity_logic':''},
        {'id':7,'name':'step8','time_start':'','activity_logic':''},
        {'id':8,'name':'step9','time_start':'','activity_logic':''}
    ];
    
    this.teams = [
        {'id': '0','name': 'POD 1',
         'team_status':'active', 'count': '0',
         'doctor' :'',
         'members':[]
        },
        {'id': '1','name': 'POD 2',
         'team_status':'active', 'count': '0',
         'doctor' :'',
         'members':[]
        },
        {'id': '2','name': 'POD 3',
         'team_status':'active', 'count': '0',
         'doctor' :'',
         'members':[]
        },
        {'id': '3','name': 'POD 4',
         'team_status':'active', 'count': '0',
         'doctor' :'',
         'members':[]
        },
        {'id': '4','name': 'POD 5',
         'team_status':'active', 'count': '0',
         'doctor' :'',
         'members':[]
        }
    ];
    
    //  pod, doctor, rn, patient
    this.dataForReport = [];

});